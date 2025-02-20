document.addEventListener('DOMContentLoaded', () => {
    const videoList = document.getElementById('videoList');
    const videoPlayer = document.getElementById('videoPlayer');
    const themeToggle = document.getElementById('themeToggle');

    // Cargar videos desde el JSON
    fetch('videos.json')
        .then(response => response.json())
        .then(videos => {
            videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.className = 'videoItem';
                videoItem.textContent = video.name;
                videoItem.addEventListener('click', () => {
                    videoPlayer.src = video.url;
                    videoPlayer.play();
                });
                videoList.appendChild(videoItem);
            });
        });

    // Cambiar tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    });
});