const imageDiv = document.getElementById("imageDiv");
const images = ["../img/circle.webp", "../img/circle2.webp"]; // Rutas de las imágenes
let currentImageIndex = 0;
let isAnimating = true;
let intervalId;



function changeImage() {
  if (!isAnimating) return;
  const now = new Date();
  const seconds = now.getUTCSeconds();

  //Cambia la imagen cada 20 segundos.
  if( Math.floor(seconds / 40) == 1 ){
    imageDiv.style.backgroundImage = ' url(../img/circle.webp)';
    
    }else{
        imageDiv.style.backgroundImage = 'url(../img/circle2.webp)';
        currentImageIndex = 1;
    }
    
    intervalId = setTimeout(changeImage, 1000); // Se checkea cada 1 segundos
}

function toggleAnimation() {

  isAnimating = !isAnimating;
  if (isAnimating) {
    changeImage();
    document.getElementById('playButton').innerHTML = 'pause';
  } else {
    clearTimeout(intervalId);
    document.getElementById('playButton').innerHTML = 'play_arrow';
  }
}

changeImage(); // Iniciar el cambio de imágenes