# Usar la imagen base UBI9 con httpd
FROM registry.access.redhat.com/ubi9/httpd-24:latest

# User root to install and update
USER root

# Instalar jq, Spectral y sus dependencias
RUN dnf install -y jq --enablerepo=rhel-9-for-x86_64-baseos-rpms && dnf install -y nodejs --enablerepo=ubi-9-appstream-rpms

# Instalar Spectral y sus dependencias
RUN npm install -g @stoplight/spectral-cli

# Update and clean
RUN dnf update -y && dnf clean all

# User default to container
USER default

# Crear el directorio para la subida de ficheros
RUN mkdir -p /opt/app-root/uploads

# Copiar la configuración personalizada de Apache
COPY ./web/httpd.conf /etc/httpd/conf/httpd.conf

# Copiar la configuración personalizada de Spectral
COPY ./web/.spectral-rules.json /opt/app-root/.spectral-rules.json

# Copia de archivos de certificados
COPY ./web/web-spectral.crt /etc/httpd/tls/
COPY ./web/web-spectral.key /etc/httpd/tls/

# Modificación del archivo ssl.conf
RUN sed -i 's|^SSLCertificateFile /etc/httpd/tls/localhost.crt|SSLCertificateFile /etc/httpd/tls/web-spectral.crt|' /etc/httpd/conf.d/ssl.conf
RUN sed -i 's|^SSLCertificateKeyFile .*|SSLCertificateKeyFile /etc/httpd/tls/web-spectral.key|' /etc/httpd/conf.d/ssl.conf

# Copiar los archivos de la web
COPY ./web/index.html /var/www/html/index.html

# Copia del script analyse.sh
COPY ./web/analyse.sh /var/www/cgi-bin/analyse.sh
