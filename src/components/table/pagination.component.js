import React, {Component} from 'react';

class Pagination extends Component {
    render() {
        let page = Math.round(this.props.data.meta.count / this.props.limit);
        let currentPage = Math.round((this.props.data.meta.offset + this.props.limit) / this.props.limit);
        let first = 1;
        let last = page;

        if (page > 3) {
            if (currentPage > 2) {
                first = currentPage < page ? currentPage - 1 : currentPage - 2;
            }

            if (page > currentPage) {
                last = currentPage > 1 ? currentPage + 1 : 3;
            }

        }

        let p = [];
        for (let i = first - 1; i < last; i++) {
            let offset = i * this.props.limit
            p.push(
                <a key={i} onClick={this.props.getData.bind(this, offset)} className={"paginate_button " + (i === currentPage - 1 ? "current" : "")} aria-controls="myTable" data-dt-idx={i+1} tabIndex={0}>{i+1}</a>
            )
        }

        return(
            <div className="dataTables_paginate paging_simple_numbers" id="myTable_paginate">
                { first > 1
                    ? <a onClick={currentPage > 0 ? this.props.getData.bind(this, (currentPage - 2) * this.props.limit) : () => {}} className={"paginate_button previous " + (currentPage === 1 ? "disabled" : "")} aria-controls="myTable" data-dt-idx={0} tabIndex={0} id="myTable_previous">Previous</a>
                    : "" }
                <span>
                    { p }
                </span>
                { last < page
                    ? <a onClick={currentPage < page ? this.props.getData.bind(this, (currentPage) * this.props.limit) : () => {}} className={"paginate_button next " + (currentPage === page ? "disabled" : "")} aria-controls="myTable" data-dt-idx={7} tabIndex={0} id="myTable_next">Next</a>
                    : "" }
            </div>
        );
    }
};

export default Pagination;