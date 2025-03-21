# Imagen base para compilar con Debian
FROM rust:slim-bookworm AS builder  

# Actualiza e instala paquetes necesarios
RUN apt-get update && apt-get install -y pkg-config libasound2-dev libudev-dev build-essential && rm -rf /var/lib/apt/lists/*

# Crea el directorio de la app
WORKDIR /usr/src/app

# Copia todos los archivos
COPY . .

# Elimina el Dockerfile del contenedor
RUN rm -rf Dockerfile

# Descarga las dependencias sin compilar
RUN cargo fetch

# Compila en modo release
RUN cargo build --release

# Reduce el tamaño del binario en la imagen builder
RUN strip /usr/src/app/target/release/pacman-rust


# Imagen base mínima y final
FROM debian:bookworm-slim

# Actualiza e instala paquetes necesarios
RUN apt-get update && apt-get install -y libasound2 libudev1 alsa-utils && rm -rf /var/lib/apt/lists/*

# Copia el binario compilado desde la imagen de compilación
COPY --from=builder /usr/src/app/target/release/pacman-rust /usr/local/bin/pacman-rust

# Usuario no privilegiado
USER 20000

# Expone el puerto
EXPOSE 8080

# Ejecuta la aplicación
CMD ["/usr/local/bin/pacman-rust"]
