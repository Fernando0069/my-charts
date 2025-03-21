# Imagen base para compilar con Debian
FROM rust:bookworm AS builder  

# Actualiza e instala paquetes necesarios
RUN apt-get update && apt-get install -y musl-tools pkg-config libasound2-dev libudev-dev build-essential && rm -rf /var/lib/apt/lists/*

# Crea el directorio de la app
WORKDIR /usr/src/app

# Copia todos los archivos
COPY . .

# Elimina el Dockerfile del contenedor
RUN rm -rf Dockerfile

# Descarga las dependencias sin compilar
RUN cargo fetch --target x86_64-unknown-linux-musl

# Compila en modo release
RUN cargo build --release --target x86_64-unknown-linux-musl


# Imagen base mínima y final
FROM alpine:latest

# Actualiza e instala paquetes necesarios
RUN apk update && apk add --no-cache alsa-lib eudev 

# Copia el binario compilado desde la imagen de compilación
COPY --from=builder /usr/src/app/target/x86_64-unknown-linux-musl/release/pacman-rust /usr/local/bin/pacman-rust

# Expone el puerto
EXPOSE 8080

# Ejecuta la aplicación
CMD ["/usr/local/bin/pacman-rust"]
