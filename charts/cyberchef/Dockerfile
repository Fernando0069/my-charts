FROM alpine:latest AS builder

RUN apk add unzip wget
RUN mkdir -p /var/cyberchef
WORKDIR /var/cyberchef
RUN wget https://github.com/gchq/CyberChef/releases/download/v10.19.4/CyberChef_v10.19.4.zip
RUN unzip CyberChef_v10.19.4.zip
RUN mv CyberChef_v10.19.4.html index.html


FROM ubi9/httpd-24:latest AS cyberchef

COPY  --from=builder /var/cyberchef/ /var/www/html/
