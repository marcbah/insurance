FROM nginx:stable-alpine
ARG WWW_DIR
ARG NGINX_CONFIG
COPY ${WWW_DIR}/ /srv/www/
COPY ${NGINX_CONFIG} /etc/nginx/nginx.conf
