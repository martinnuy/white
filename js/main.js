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

function mostrarModal(imgId){

  var imgElement = document.getElementById(imgId);

  document.getElementById('imgModal').setAttribute('src', imgElement.getAttribute('src') );
  document.getElementById('location').innerHTML = imgElement.getAttribute('data-location');
  document.getElementById('year').innerHTML = '('+imgElement.getAttribute('data-year')+')';
  document.getElementById('camera').innerHTML = imgElement.getAttribute('data-camera');
  document.getElementById('phType').innerHTML = imgElement.getAttribute('data-phType');


  $("#ph").modal('show');
}




$(document).ready(function(){
  $('div.modal').on('show.bs.modal', function() {
    var modal = this;
    var id = modal.id;
    // Utilizamos pushState para cambiar la URL
    history.pushState(null, null, id);
    window.onpopstate = function(event) {
      if (!event.state){
        $(modal).modal('hide');
      }
    };
  });
  $('div.modal').on('hidden.bs.modal', function() {
    // Reemplazamos la URL cuando se cierra el modal
    history.pushState(null, null, window.location.pathname);
  });
  // Cuando se hace clic en el botón de cierre, simulamos un retroceso en la historia
  $('div.modal button.close').on('click', function(){
    history.back();
  });
  // Cuando se presiona la tecla Esc con el modal abierto, simulamos un retroceso en la historia
  $('div.modal').keyup(function(e) {
    if (e.keyCode == 27){
      history.back();          
    }
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const nameElement = document.getElementById("loadName");
  const lastnameElement = document.getElementById("lastname");
  const loaderElement = document.getElementById("loader");

  setTimeout(function () {
      lastnameElement.style.opacity = "0";
  }, 500); // Desvanece el apellido después de 0.5 segundos

  setTimeout(function () {
      nameElement.style.opacity = "0";
  }, 1500); // Desvanece el nombre después de 1.5 segundos

  setTimeout(function () {
      loaderElement.style.opacity = "0";
      setTimeout(function () {
          loaderElement.style.display = "none";
      }, 1000); // Oculta el div de carga después de que ambos elementos se desvanecen
  
      document.getElementsByTagName('body')[0].style.overflow = 'visible';
    }, 2500); // Oculta el div de carga después de 2.5 segundos
});