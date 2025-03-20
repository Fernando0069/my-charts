# Imagen base para compilar
FROM rust:latest AS builder

# Instala paquetes necesarios
RUN apt-get update && apt-get install -y \
    libasound2-dev \
    libudev-dev \
    pkg-config

# Crea el directorio de la app
WORKDIR /usr/src/app

# Copia todos los archivos
COPY . .
RUN rm -rf Dockerfile

# Compila en modo release
RUN cargo build --release

RUN ls -l /usr/src/app/target/release/pacman-rust


# Imagen base mínima y final
FROM alpine:latest

# Copia el binario compilado desde la imagen de compilación
COPY --from=builder /usr/src/app/target/release/pacman-rust /usr/local/bin/pacman-rust
RUN ls -l /usr/src/app/target/release/pacman-rust /usr/local/bin/pacman-rust

# Expone el puerto
EXPOSE 8080

# Ejecuta la aplicación
CMD ["/usr/local/bin/pacman-rust"]
