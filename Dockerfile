FROM mhart/alpine-node:10 AS build
LABEL Dhian Trisna Alyusi
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ARG staging_api_url
ENV API_URL=$staging_api_url
ARG staging_client_key
ENV CLIENT_KEY=$staging_client_key
ARG staging_base_url
ENV BASE_URL=$staging_base_url
COPY package.json /usr/src/app/package.json
RUN echo "REACT_APP_API_URL=${staging_api_url}" >> /usr/src/app/.env
RUN echo "REACT_APP_CLIENT_KEY=${staging_client_key}" >> /usr/src/app/.env
RUN echo "BASE_URL=${staging_base_url}" >> /usr/src/app/.env
RUN npm cache clean --force
RUN npm install
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
RUN npm run-script build

FROM mhart/alpine-node:10
RUN mkdir -p /app
COPY ./server /app/server
WORKDIR /app/server
RUN npm install --silent
COPY --from=build /usr/src/app/build /app/server/public
EXPOSE 8092

CMD [ "node", "server.js" ]