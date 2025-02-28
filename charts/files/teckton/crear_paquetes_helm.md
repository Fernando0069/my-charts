# Crear paquetes con Helm

Automatizacion para la actualización de los paquetes de Helm y del repositorio.

## Objetos y descripción
```
  Secret - comunicación con el repositorio
  Pipeline - organizar las tareas
  Task - tareas
  TriggerBinding
  TriggerTemplate
  EventListener
  Route
  Webhook
```

## Código de cada objeto:
### Secret
````
kind: Secret
apiVersion: v1
metadata:
  name: github-secret
  namespace: fernando0069-dev
data:
  username: ZmVybmFuZG8wMDY5QGdtYWlsLmNvbQ==
  token: XXXXXX
type: Opaque
```




/*    REVISAR    */

### TriggerBinding
```
apiVersion: triggers.tekton.dev/v1beta1
kind: TriggerBinding
metadata:
  name: github-binding
spec:
  params:
    - name: repo-url
      value: $(body.repository.clone_url)
    - name: revision
      value: $(body.ref)
```

### TriggerTemplate 
```
apiVersion: triggers.tekton.dev/v1beta1
kind: TriggerTemplate
metadata:
  name: github-trigger-template
spec:
  params:
    - name: repo-url
    - name: revision
  resourcetemplates:
    - apiVersion: tekton.dev/v1beta1
      kind: PipelineRun
      metadata:
        generateName: helm-package-run-
      spec:
        pipelineRef:
          name: helm-package-pipeline
        workspaces:
          - name: shared-workspace
            volumeClaimTemplate:
              spec:
                accessModes: ["ReadWriteOnce"]
                resources:
                  requests:
                    storage: 1Gi
        params:
          - name: repo-url
            value: $(params.repo-url)
          - name: revision
            value: $(params.revision)
          - name: git-user
            value: "tu_usuario_git"
          - name: git-email
            value: "tu_email@example.com"
```

### EventListener
```
apiVersion: triggers.tekton.dev/v1beta1
kind: EventListener
metadata:
  name: github-listener
spec:
  serviceAccountName: pipeline
  triggers:
    - bindings:
        - ref: github-binding
      template:
        ref: github-trigger-template
```

### Route
```
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: github-listener-route
spec:
  to:
    kind: Service
    name: el-github-listener
  port:
    targetPort: http-listener
```

### Webhook
```
GitHub > Tu Repositorio > Settings > Webhooks.
Añade un nuevo Webhook con estos datos:
  Payload URL: La URL expuesta del EventListener (usa oc get routes para verla).
  Content type: application/json.
  Trigger: Selecciona Just the push event.
```