# Teckton

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

### Pipeline
```
apiVersion: tekton.dev/v1
kind: Pipeline
metadata:
  name: helm-package-pipeline
  namespace: fernando0069-dev
spec:
  params:
    - default: Fernando
      name: git-user
      type: string
    - default: fernando0069@gmail.com
      name: git-email
      type: string
    - default: web-status cyberchef reverseshellgenerator web-spectral do180-php-helloworld do180-nodejs-helloworld do180-php-temperature do180-nodejs-app do180-todo-html5
      name: app-list
      type: string
  tasks:
    - name: clone-repo
      taskRef:
        kind: Task
        name: clone-repo
      workspaces:
        - name: source
          workspace: shared-workspace
    - name: helm-lint
      params:
        - name: app-list
          value: $(params.app-list)
      runAfter:
        - clone-repo
      taskRef:
        kind: Task
        name: helm-lint
      workspaces:
        - name: source
          workspace: shared-workspace
    - name: create-packages
      params:
        - name: app-list
          value: $(params.app-list)
      runAfter:
        - helm-lint
      taskRef:
        kind: Task
        name: create-packages
      workspaces:
        - name: source
          workspace: shared-workspace
    - name: update-index
      runAfter:
        - create-packages
      taskRef:
        kind: Task
        name: update-index
      workspaces:
        - name: source
          workspace: shared-workspace
    - name: git-push
      params:
        - name: git-user
          value: $(params.git-user)
        - name: git-email
          value: $(params.git-email)
      runAfter:
        - update-index
      taskRef:
        kind: Task
        name: git-push
      workspaces:
        - name: source
          workspace: shared-workspace
    - name: update-gh-pages
      params:
        - name: git-user
          value: $(params.git-user)
        - name: git-email
          value: $(params.git-email)
      runAfter:
        - git-push
      taskRef:
        kind: Task
        name: update-gh-pages
      workspaces:
        - name: source
          workspace: shared-workspace
  workspaces:
    - name: shared-workspace
```

### Tasks
#### clone-repo
```
apiVersion: tekton.dev/v1
kind: Task
metadata:
  name: clone-repo
  namespace: fernando0069-dev
spec:
  steps:
    - computeResources: {}
      image: alpine/git
      name: clone
      script: |
        #!/bin/sh
        set -e
        rm -rf $(workspaces.source.path)/my-charts
        cd $(workspaces.source.path)
        git clone 'https://github.com/Fernando0069/my-charts.git' --branch main
  workspaces:
    - name: source
```
#### helm-lint
```
apiVersion: tekton.dev/v1
kind: Task
metadata:
  name: helm-lint
  namespace: fernando0069-dev
spec:
  params:
    - name: app-list
      type: string
  steps:
    - computeResources: {}
      image: alpine/helm
      name: lint
      script: |
        #!/bin/sh
        set -e
        for app in $(params.app-list); do
          echo "Linting chart: $app"
          if [ -d "$(workspaces.source.path)/my-charts/charts/$app" ]; then
            helm lint $(workspaces.source.path)/my-charts/charts/$app
          else
            echo "Warning: Chart directory $(workspaces.source.path)/my-charts/charts/$app does not exist!"
          fi
        done
  workspaces:
    - name: source
```
#### create-packages
```
apiVersion: tekton.dev/v1
kind: Task
metadata:
  name: create-packages
  namespace: fernando0069-dev
spec:
  params:
    - name: app-list
      type: string
  steps:
    - image: alpine/helm
      name: package-charts
      script: |
        #!/bin/sh
        set -e
        cd $(workspaces.source.path)/my-charts
        mkdir -p apps
        # Recorrer la lista de aplicaciones y empaquetarlas
        for app in $(params.app-list); do
          if [ -d "$app" ]; then
            helm package charts/"$app" -d apps/
            echo "✅ Paquete creado: apps/$app-*.tgz"
          else
            echo "⚠️  Advertencia: La carpeta '$app' no existe en my-charts."
          fi
        done
  workspaces:
    - name: source
```
#### update-index
```
apiVersion: tekton.dev/v1
kind: Task
metadata:
  name: update-index
  namespace: fernando0069-dev
spec:
  steps:
    - image: alpine/helm
      name: update-index
      script: |
        #!/bin/sh
        set -e
        cd $(workspaces.source.path)/my-charts
        helm repo index .
  workspaces:
    - name: source
```
#### git-push
```
apiVersion: tekton.dev/v1
kind: Task
metadata:
  name: git-push
  namespace: fernando0069-dev
spec:
  params:
    - name: git-user
      type: string
    - name: git-email
      type: string
  steps:
    - image: alpine/git
      name: push
      script: |
        #!/bin/sh
        set -e
        cd $(workspaces.source.path)/my-charts
        git config --global user.name "$(params.git-user)"
        git config --global user.email "$(params.git-email)"
        git add .
        git commit -m "Actualización automática del Chart"
        git push origin main
  workspaces:
    - name: source
```
#### update-gh-pages
```
apiVersion: tekton.dev/v1
kind: Task
metadata:
  name: update-gh-pages
  namespace: fernando0069-dev
spec:
  params:
    - name: git-user
      type: string
    - name: git-email
      type: string
  steps:
    - image: alpine/git
      name: reset
      script: |
        #!/bin/sh
        set -e
        cd $(workspaces.source.path)/my-charts

        # Configurar usuario de Git
        git config --global user.name "$(params.git-user)"
        git config --global user.email "$(params.git-email)"

        # Verificar si la rama gh-pages existe
        if git rev-parse --verify origin/gh-pages >/dev/null 2>&1; then
          git checkout gh-pages
          git rm -rf .
        else
          git checkout --orphan gh-pages
        fi

        # Confirmar y hacer push de la rama limpia
        git commit --allow-empty -m "Reiniciando gh-pages"
        git push origin gh-pages --force
  workspaces:
    - name: source
```

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