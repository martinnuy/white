const imageDiv = document.getElementById("imageDiv");
let currentImageIndex = 0;
let isAnimating = true;
let intervalId;

let elementoActual = 'home';


function changeImage() {
  if (!isAnimating) return;
  const now = new Date();
  const seconds = now.getUTCSeconds();

  //Cambia la imagen cada 20 segundos.
  if( Math.floor(seconds / 40) == 1 ){
    imageDiv.style.backgroundImage = ' url(./img/circle.webp)';
    
    }else{
        imageDiv.style.backgroundImage = 'url(./img/circle2.webp)';
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




function showDiv( elementCambio ){
    
      if(elementoActual != elementCambio){

        document.getElementById(elementoActual).style.opacity = '0';

        setTimeout(() => {
          document.getElementById(elementoActual).style.visibility = 'hidden';
          document.getElementById(elementoActual).style.display = 'none';  
        }, 400);//Deben ser los mismos milisegundos que en la clase 'hiddenDiv'.

      }

      
  setTimeout(() => {

    document.getElementById(elementCambio).style.visibility = 'visible';
    document.getElementById(elementCambio).style.display = 'block';
    
    setTimeout(() => {
      document.getElementById(elementCambio).style.opacity = '1';
      elementoActual = elementCambio;
    }, 100);

  }, 400);//Deben ser los mismos milisegundos que en la clase 'hiddenDiv'.

  
}

showDiv('home'); //Inicia mostrando el div 'home';