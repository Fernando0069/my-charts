const maxFileSizeMB = 1; // Tamaño máximo del archivo en MB

document.getElementById("fileUpload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file.size > maxFileSizeMB * 1024 * 1024) {
        alert(`El archivo no puede superar los ${maxFileSizeMB} MB.`);
        event.target.value = ""; // Resetea el input
        return;
    }
    document.getElementById("message").textContent = "Fichero listo para ser subido.";
});

document.getElementById("uploadButton").addEventListener("click", function () {
    const fileInput = document.getElementById("fileUpload");
    if (!fileInput.files[0]) {
        alert("Por favor, selecciona un fichero.");
        return;
    }
    
    document.getElementById("message").textContent = "Analizando el fichero...";
    document.getElementById("report").classList.add("hidden");

    // Simulación del análisis (reemplazar con una llamada real al backend)
    setTimeout(() => {
        document.getElementById("message").textContent = "¡Análisis completado!";
        document.getElementById("report").textContent = "Este es el informe del análisis (simulado).";
        document.getElementById("report").classList.remove("hidden");
    }, 3000);
});
