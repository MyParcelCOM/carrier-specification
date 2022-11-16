#!/usr/bin/env sh

# call the original entrypoint
/docker-entrypoint.sh

# replace text with assigned env values
envsubst "\${RELEASE_VERSION}" < \
        /usr/share/nginx/html/dist/swagger.template.json > /usr/share/nginx/html/dist/swagger.json

rm /usr/share/nginx/html/dist/swagger.template.json

exec "$@"
