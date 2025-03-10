#!/bin/bash

# analyse.bash - 21/01/2025
# Este script maneja las subidas de archivos y procesa el archivo con Spectral.
# RC:
#   1 - El script debe ser ejecutado con usuario privilegiado.
#   2 - El El fichero '${DEFAULT_FILE}' no existe o está vacío.
#   3 - El fichero '${DEFAULT_FILE}' no tiene formato JSON.
#   4 - El fichero '${FILE}' no existe o está vacío.
#   5 - El fichero '${DEFAULT_FILE}' no tiene formato JSON.
#   6 - El archivo ${FILE} supera el tamaño máximo permitido de 1 MB.
#   7 - Spectral no está instalado o no está disponible en el sistema.
#   8 - El archivo de reglas de Spectral no esta disponible.


echo "[ INFO ]: Cominezo del script de analisis." >&2

# Directorio de subida
UPLOAD_DIR="/opt/app-root/uploads"

# Comprobar si el script está siendo ejecutado por el usuario root
if [[ ${UID} -lt 1000 ]]; then
    RC=1
    echo "[ ERROR ]: Este script debe ser ejecutado con el usuario root - ${RC}." >&2
    exit ${RC}
fi

# Crear directorio si no existe
if [[ ! -d ${UPLOAD_DIR} ]]; then
    echo "[ INFO ]: Creando directorio de subida en ${UPLOAD_DIR}" >&2
    mkdir -p "${UPLOAD_DIR}"
fi

DATE=$(date '+%Y%m%d-%H%M%S')
DEFAULT_NAME="noname"
DEFAULT_FILE=${UPLOAD_DIR}/${DEFAULT_NAME}_${DATE}

# Leer archivo desde stdin
echo "[ INFO ]: Leyendo archivo desde stdin y guardando en ${DEFAULT_FILE}" >&2
cat > "${DEFAULT_FILE}"

if [[ ! -s "${DEFAULT_FILE}" ]]; then
    RC=2
    echo "Content-Type: text/plain"
    echo ""
    echo "[ ERROR ]: El archivo ${DEFAULT_FILE} no existe o está vacío."
    echo ""
    echo "[ ERROR ]: El archivo ${DEFAULT_FILE} no existe o está vacío - ${RC}." >&2
    exit ${RC}
fi

# Validar si el archivo tiene cabecera JSON
if ! grep -q "Content-Type: application/json" "${DEFAULT_FILE}"; then
    RC=3
    echo "Content-Type: text/plain"
    echo ""
    echo "[ ERROR ]: El archivo subido no está en formato JSON."
    echo "[ ERROR ]: Por favor, suba un archivo JSON válido."
    echo ""
    echo "[ ERROR ]: El archivo subido no está en formato JSON - ${RC}." >&2
    exit ${RC}
fi

# Obtener el nombre del archivo subido
FILE_NAME=$(sed -n 's/.*filename="\([^"]*\)".*/\1/p' ${DEFAULT_FILE})
FILE=${UPLOAD_DIR}/${FILE_NAME}_${DATE}

# Eliminar cabeceras y pies no deseados, dejando solo el contenido JSON
awk 'BEGIN {in_json=0} /Content-Type: application\/json/ {in_json=1; next} /------/ {if (in_json) {print ""; in_json=0} next} in_json' "${DEFAULT_FILE}" > "${FILE}"

# Validar si el archivo no está vacío
if [[ ! -s "${FILE}" ]]; then
    RC=4
    echo "Content-Type: text/plain"
    echo ""
    echo "[ ERROR ]: El archivo procesado ${FILE} no existe o está vacío."
    echo ""
    echo "[ ERROR ]: El archivo procesado ${FILE} no existe o está vacío - ${RC}." >&2
    exit ${RC}
fi

# Validar si el archivo procesado sigue siendo JSON
if ! jq . ${FILE} > /dev/null 2>&1; then
    RC=5
    echo "Content-Type: text/plain"
    echo ""
    echo "[ ERROR ]: El archivo subido no está en formato JSON."
    echo ""
    echo "[ ERROR ]: El archivo subido no está en formato JSON - ${RC}." >&2
    exit ${RC}
fi

# Eliminar el archivo temporal DEFAULT_FILE
rm -f "${DEFAULT_FILE}"

# Verificar el tamaño del archivo (1 MB)
FILE_SIZE=$(stat --format="%s" "${FILE}")
if [[ ${FILE_SIZE} -gt 1048576 ]]; then
    RC=6
    echo "[ ERROR ]: El archivo ${FILE} supera el tamaño máximo permitido de 1 MB - ${RC}." >&2
    exit ${RC}
fi

# Analizamos el archivo subido con Spectral
if command -v spectral &>/dev/null; then
    RULES_FILE="/opt/app-root/.spectral-rules.json"
    if [[ -s "${RULES_FILE}" ]]; then
        echo "[ INFO ]: Ejecutando Spectral sobre el archivo ${FILE}." >&2
        RESULT=$(spectral lint --ruleset ${RULES_FILE} --format stylish ${FILE})
        echo "Content-Type: text/plain"
        echo ""
        echo "Analysis Report:"
        echo ""
        echo "${RESULT}"
        echo "[ INFO ]: Analisis del archivo ${FILE}:" >&2
        echo "[ INFO ]: ${RESULT}" >&2
    else
        RC=8
        echo "Content-Type: text/plain"
        echo ""
        echo "[ ERROR ]: El archivo de reglas de Spectral no esta disponible."
        echo ""
        echo "[ ERROR ]: El archivo de reglas de Spectral no esta disponible - ${RC}." >&2
        exit ${RC}
    fi
else
    RC=7
    echo "Content-Type: text/plain"
    echo ""
    echo "[ ERROR ]: Spectral no está instalado o no está disponible en el sistema."
    echo ""
    echo "[ ERROR ]: Spectral no está instalado o no está disponible en el sistema - ${RC}." >&2
    exit ${RC}
fi

# Limpiamos el entorno de ficheros con más de 2 días.
find ${UPLOAD_DIR} -type f -mtime +2 -delete
echo "[ INFO ]: Finalizacion del script de analisis." >&2
