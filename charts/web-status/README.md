# Web-Status charts

Se crea la imágen desde el fichero Dockerfile con los ficheros de /files.

Para crear la aplicación Web-Status debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                      # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install web-status apps/Web-Status                                                           # Instalar la aplicación "Web-Status" con el nombre "web-web-status".
  3.- curl -vvv https://web-web-status-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/      # Verificar la URL.
```

Para eliminar la aplicación Web-Status debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall web-web-status                                    # Desinstalar la aplicación con el nombre "web-web-status" ("Web-Status").
  2.- helm repo remove apps                                            # Eliminación del repositorio de aplicaciones.
```

Los objetos que se crean son los siguientes:
```
  0.- Disponer del archivo Dockerfile en git.
  1.- Crear el ImageStream.
  2.- Crear el BuildConfig.
  3.- Crear el Deployment.
  4.- Crear el HorizontalPodAutoscalers (hpa).
  5.- Crear el PodDisruptionBudget (pdb).
  6.- Crear el Service.
  7.- Crear el Route.
```

Comandos:
```
Construir: podman build -t web-status:0.1 .
           podman build -t web-status:latest .
Ejecución: podman run -d --name web-status -p 8080:8080 web-status:0.1
           podman run -d --name web-status -p 8080:8080 web-status:latest
Shell: podman exec -it web-status /bin/bash
Verificar: curl -vvv http://localhost:8080
           curl -vvv http://localhost:8080/status
```

Proxy:
```
  export HTTP_PROXY=http://app_ses_proxypre:sajBwdx4.67S@10.11.33.86:80/
  export HTTPS_PROXY=http://app_ses_proxypre:sajBwdx4.67S@10.11.33.86:80/
  export NO_PROXY=ocspcomp.cert.fnmt.es,tsafirma.redsara.es,pmicrofirmabio.ses.mir.es,.ses.mir.es,.redpol.mir.es,.sgsics.es,.pre-ses.mir.es,.pre.redpol.mir.es,ocsprep.cert.fnmt.es
```

Revisar permisos:
```
  chmod 644 public/style.css public/index.html public/error.html
```