import React, {Component} from 'react';

class Input extends Component {
    constructor(props) {
        super(props);

        var data = {};
        data[this.props.name] = '';
        data["formErrors"] = [];
        data["formErrors"][this.props.name] = false;
        data["emailValid"] = true;
        data["lengthValid"] = true;
        this.state = data;

        this.changeValue = this.changeValue.bind(this)
        this.checkEmail = this.checkEmail.bind(this)
        this.checkLength = this.checkLength.bind(this)
    }

    changeValue(e) {
        var data = [];
        var value = e.target.value;
        data[this.props.name] = value;
        data["formErrors"] = [];
        data["formErrors"][this.props.name] = (value !== "" ? false : true);
        this.setState(data);
        this.props.changeValue(this.props.name, value);
        this.props.changeValue(this.props.name + "Valid", !data["formErrors"][this.props.name]);
        this.props.changeValue("isSubmit", false);

        if (this.props.type === "email") {
            this.checkEmail(value);
        }

        if (this.props.minLength && this.props.minLength > 0) {
            this.checkLength(value);
        }
    }

    checkEmail(value) {
        var pattern = /^[\w._]*@[\w._]*/gm
        var res = pattern.exec(value)

        this.setState({
            emailValid: (res != null)
        })
    }

    checkLength(text) {
        this.setState({
            lengthValid: text.length >= this.props.minLength
        })
    }

    render() {
        return (
            <React.Fragment>
                <input
                    autoComplete="off"
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    className={"form-control " + (this.state.formErrors[this.props.name] || (this.state[this.props.name] === "" && this.props.isSubmit) ? "is-invalid" : "")}
                    name={this.props.name}
                    onChange={this.changeValue}
                    pattern={this.props.type === "email" ? /^[\w._]*@[\w._]*/gm : ""}
                    minLength={this.props.minLength ? this.props.minLength : 0}
                />
                <div className={"help-block" + (this.state[this.props.name] !== "" && ((this.props.type === "email" && !this.state.emailValid) || (this.props.minLength && this.props.minLength > 0 && !this.state.lengthValid))  ? " show" : "")}>
                    { (this.state.formErrors[this.props.name] || (this.state[this.props.name] === "" && this.props.isSubmit))
                        ? "Please enter your " + this.props.name + "!"
                        : ""
                    }
                    { (this.props.type === "email" && !this.state.emailValid && this.state[this.props.name] !== "")
                        ? "Fill this with valid email"
                        : ""
                    }
                    { (this.state[this.props.name] !== "" && this.props.minLength && this.props.minLength > 0 && !this.state.lengthValid)
                        ? "Minimal " + this.props.minLength + " characters"
                        : ""
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Input