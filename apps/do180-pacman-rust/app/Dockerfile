# Imagen base para compilar
FROM rust:latest AS builder

# Crea el directorio de la app
WORKDIR /usr/src/app

# Copia todos los archivos
#COPY ./src/Cargo.toml /usr/src/app/Cargo.toml
#COPY ./src/main.rs /usr/src/app/main.rs
COPY . .
RUN pwd && ls -lR

# Compila en modo release
RUN cargo build --release


# Imagen base mínima y final
FROM alpine:latest

# Copia el binario compilado desde la imagen de compilación
COPY --from=builder /usr/src/app/target/release/pacman-rust /usr/local/bin/pacman-rust

# Expone el puerto (si la app usa HTTP)
EXPOSE 8080

# Ejecuta la aplicación
CMD ["/usr/local/bin/pacman-rust"]
