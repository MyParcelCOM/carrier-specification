FROM node:11.12 as build

COPY . /build
WORKDIR /build

RUN apt update \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g json-refs \
    && npm install --quiet \
    && mkdir -p dist \
    && json-refs resolve schema.json -f > dist/swagger.json \
    && ./node_modules/.bin/gulp src \
    && ./node_modules/.bin/gulp html \
    && ./node_modules/.bin/gulp swagger-ui

FROM nginx:1.15-alpine

COPY --from=build /build/dist /usr/share/nginx/html/carrier-specification

ADD ./docker/build/default.conf /etc/nginx/conf.d/default.conf
