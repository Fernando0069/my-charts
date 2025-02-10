FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:latest

USER root

# Crear el directorio y asignar los permisos adecuados
RUN mkdir -p /app && chown 1001:0 /app && chmod g+rwX /app

USER 1001

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar ficheros de la aplicación
COPY files/error.html /app/public/error.html
COPY files/index.html /app/public/index.html
COPY files/index.js /app
COPY files/package.json /app
COPY files/style.css /app/public/style.css


# Instalar las dependencias necesarias
RUN npm install --omit=dev

# Exponer el puerto estándar
EXPOSE 8080

# Comando por defecto para iniciar la aplicación
CMD ["node", "index.js"]
