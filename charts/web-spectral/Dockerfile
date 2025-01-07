# Dockerfile para construir el contenedor web

# Usar la imagen base UBI9 con httpd
FROM registry.access.redhat.com/ubi9/httpd-24

# Directorio donde se copiarán los archivos web
WORKDIR /var/www/html

# Copiar los archivos de la página web al contenedor
COPY ./web /var/www/html

# Configurar permisos necesarios
RUN chown -R apache:apache /var/www/html \
    && chmod -R 755 /var/www/html

# Exponer el puerto 8080 (por defecto en UBI9 HTTPD)
EXPOSE 8080

# Comando para iniciar el servidor Apache
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
