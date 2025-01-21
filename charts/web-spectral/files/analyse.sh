#!/bin/bash

# Este script maneja las subidas de archivos y procesa el archivo con Spectral
# RC:
#   1 - El fichero '${DEFAULT_FILE}' no existe o está vacío.
#   2 - El fichero '${DEFAULT_FILE}' no tiene formato JSON.
#   3 - El fichero '${FILE}' no existe o está vacío.
#   4 - El fichero '${DEFAULT_FILE}' no tiene formato JSON.
#   5 - El archivo ${FILE} supera el tamaño máximo permitido de 1 MB.
#   6 - Spectral no está instalado o no está disponible en el sistema.
#   7 - El archivo de reglas de Spectral no esta disponible.
# Mejoras:
#   - Añdir fichero de logs independiente --> tee
#   - Añdir al logs del sistema la ejecución pero no en DEBUG
#   - Verificar si el usuario que lo ejecuta sea root (0).


echo "[ DEBUG ]: Inicio del script" >&2

# Directorio de subida
UPLOAD_DIR="/opt/app-root/uploads"

# Crear directorio si no existe
if [[ ! -d ${UPLOAD_DIR} ]]; then
    echo "[ DEBUG ]: Creando directorio de subida en ${UPLOAD_DIR}" >&2
    mkdir -p "${UPLOAD_DIR}"
fi

DATE=$(date '+%Y%m%d-%H%M%S')
DEFAULT_NAME="noname"
DEFAULT_FILE=${UPLOAD_DIR}/${DEFAULT_NAME}_${DATE}

# Leer archivo desde stdin
echo "[ DEBUG ]: Leyendo archivo desde stdin y guardando en ${DEFAULT_FILE}" >&2
cat > "${DEFAULT_FILE}"

if [[ ! -s "${DEFAULT_FILE}" ]]; then
    echo "[ ERROR ]: El fichero ${DEFAULT_FILE} no existe o está vacío." && RC=1 && exit ${RC}
fi

# Validar si el archivo tiene cabecera JSON
if ! grep -q "Content-Type: application/json" "${DEFAULT_FILE}"; then
    echo "Content-Type: text/plain"
    echo ""
    echo "[ ERROR ]: El archivo subido no está en formato JSON. Por favor, suba un archivo JSON válido." && RC=2 && exit ${RC}
fi

# Obtener el nombre del archivo subido
FILE_NAME=$(sed -n 's/.*filename="\([^"]*\)".*/\1/p' ${DEFAULT_FILE})
FILE=${UPLOAD_DIR}/${FILE_NAME}_${DATE}

# Eliminar cabeceras y pies no deseados, dejando solo el contenido JSON
awk 'BEGIN {in_json=0} /Content-Type: application\/json/ {in_json=1; next} /------/ {if (in_json) {print ""; in_json=0} next} in_json' "${DEFAULT_FILE}" > "${FILE}"

# Validar si el archivo no está vacío
if [[ ! -s "${FILE}" ]]; then
    echo "Content-Type: text/plain"
    echo ""
    echo "[ ERROR ]: El archivo procesado ${FILE} no existe o está vacío." && RC=3 && exit ${RC}
fi

# Validar si el archivo procesado sigue siendo JSON
if ! jq . ${FILE} > /dev/null 2>&1; then
    echo "[ ERROR ]: El archivo subido no está en formato JSON. Por favor, suba un archivo JSON válido." && RC=4 && exit ${RC}
fi

# Eliminar el archivo temporal DEFAULT_FILE
rm -f "${DEFAULT_FILE}"

# Verificar el tamaño del archivo (1 MB)
FILE_SIZE=$(stat --format="%s" "${FILE}")
if [[ ${FILE_SIZE} -gt 1048576 ]]; then
    echo "[ ERROR ]: El archivo ${FILE} supera el tamaño máximo permitido de 1 MB." && RC=5 && exit ${RC}
fi

# Analizamos el archivo ("foo1.json-20250114-174015") con Spectral si está disponible
if command -v spectral &>/dev/null; then
    RULES_FILE="/opt/app-root/.spectral-rules.json"
    if [[ -s "${RULES_FILE}" ]]; then
        echo "[ DEBUG ]: Ejecutando Spectral sobre el archivo ${FILE}" >&2
        RESULT=$(spectral lint --ruleset ${RULES_FILE} --format stylish ${FILE})
        echo "Content-Type: text/plain"
        echo ""
        echo "Analysis Report:"
        echo "${RESULT}"
    else
        echo "[ DEBUG ]: El archivo de reglas de Spectral no esta disponible." >&2
        echo "Content-Type: text/plain"
        echo
        echo "[ ERROR ]: El archivo de reglas de Spectral no esta disponible." && RC=7 && exit ${RC}
    fi
else
    echo "[ DEBUG ]: Spectral no está instalado o no está disponible en el sistema." >&2
    echo "Content-Type: text/plain"
    echo
    echo "[ ERROR ]: Spectral no está instalado o no está disponible en el sistema." && RC=6 && exit ${RC}
fi

# Limpiamos el entorno de ficheros con más de 2 días.
find ${UPLOAD_DIR} -type f -mtime +2 -delete

echo "[ DEBUG ]: Fin del script" >&2
