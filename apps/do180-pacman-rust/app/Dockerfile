# Imagen base para compilar
FROM rust:latest AS builder

# Instala paquetes necesarios
RUN apt-get update && apt-get install -y musl-tools pkg-config libasound2-dev libudev-dev && rm -rf /var/lib/apt/lists/*

# Crea el directorio de la app
WORKDIR /usr/src/app

# Copia todos los archivos
COPY . .
RUN rm -rf Dockerfile

# Compila en modo release
RUN cargo build --release --target x86_64-unknown-linux-musl


# Imagen base mínima y final
FROM alpine:latest

# Copia el binario compilado desde la imagen de compilación
COPY --from=builder /usr/src/app/target/release/pacman-rust /usr/local/bin/pacman-rust

# Expone el puerto
EXPOSE 8080

# Ejecuta la aplicación
CMD ["/usr/local/bin/pacman-rust"]
