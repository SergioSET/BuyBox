const images = [
    "..assets/main banner 3.jpg",
    "assets/main banner 3.jpg",
    // Agrega más rutas de imágenes según sea necesario
];

let currentIndex = 0;

function changeImage() {
    const heroElement = document.querySelector('.hero');
    heroElement.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
}

// Cambia la imagen cada 5 segundos
setInterval(changeImage, 5000);

// Inicializa la primera imagen
changeImage();
