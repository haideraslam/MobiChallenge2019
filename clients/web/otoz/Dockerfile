FROM httpd:2.4

COPY ./otoz-httpd.conf /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/local/apache2/htdocs/

COPY ./dist/POC/ .

EXPOSE 80

