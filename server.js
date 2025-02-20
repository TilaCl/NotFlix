const fs = require('fs');
const path = require('path');

const videosDirectory = './videos'; // Directorio donde están los videos
const jsonFilePath = './videos.json'; // Ruta del archivo JSON

function updateVideosJson() {
    fs.readdir(videosDirectory, (err, files) => {
        if (err) {
            console.error('Error leyendo el directorio de videos:', err);
            return;
        }

        const videoFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.mp4', '.mkv', '.avi'].includes(ext);
        });

        const videos = videoFiles.map(file => ({
            name: path.basename(file, path.extname(file)),
            url: `videos/${file}`
        }));

        fs.writeFile(jsonFilePath, JSON.stringify(videos, null, 2), err => {
            if (err) {
                console.error('Error escribiendo el archivo JSON:', err);
            } else {
                console.log('Archivo JSON actualizado correctamente.');
            }
        });
    });
}

// Actualizar el JSON cada 12 horas
setInterval(updateVideosJson, 12 * 60 * 60 * 1000);

// Ejecutar la primera actualización al iniciar el servidor
updateVideosJson();