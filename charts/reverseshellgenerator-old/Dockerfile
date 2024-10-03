FROM alpine:latest AS builder

RUN apk add git
RUN mkdir -p /var/reverseshellgenerator
WORKDIR /var/reverseshellgenerator
RUN git clone https://github.com/0dayCTF/reverse-shell-generator.git
RUN mv reverse-shell-generator/* . && rm -rf reverse-shell-generator/ && rm -rf Dockerfile


FROM ubi9/httpd-24:latest AS reverseshellgenerator

COPY  --from=builder /var/reverseshellgenerator/ /var/www/html/
