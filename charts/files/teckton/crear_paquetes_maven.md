# Crear paquetes con Maven

Automatizacion de la creación de los paquetes helloworld en formato WAR y EAR con maven y se suben al git.

## Objetos y descripción
```
  PVC - maven-pvc
  Pipeline - build-war-ear-pipeline.yaml
  Task:
    - clone-repo
    - build-war
    - build-ear
    - git-push
```

### PVC
vi maven-pvc.yaml
````
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: maven-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```
oc apply - f maven-pvc.yaml
