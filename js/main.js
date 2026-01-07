const imageDiv = document.getElementById("imageDiv");
let currentImageIndex = 0;
let isAnimating = true;
let intervalId;

let elementoActual = 'home';


function changeImage() {
  if (!isAnimating) return;
  const now = new Date();
  const seconds = now.getUTCSeconds();

  //Cambia la imagen cada 20 segundos - Logic slightly adjusted to just flip between 2 images
  if( Math.floor(seconds / 20) % 2 === 0 ){ // Simplified logic
    imageDiv.style.backgroundImage = ' url(./img/circle.webp)';
    
    }else{
        imageDiv.style.backgroundImage = 'url(./img/circle2.webp)';
        currentImageIndex = 1;
    }
    
    intervalId = setTimeout(changeImage, 1000); 
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
  
  // Update Hash without scrolling
  if(elementCambio !== 'home') {
      history.pushState(null, null, '#' + elementCambio);
  } else {
      history.pushState(null, null, ' '); // Clear hash for home
  }
  
}


// --- dynamic Gallery Logic ---

function renderGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '';
    
    // Create 3 columns for Masonry layout
    const columns = [];
    for (let i = 0; i < 3; i++) {
        const col = document.createElement('div');
        // Responsive columns: Full width on mobile, 1/3 on large screens
        col.className = 'col-lg-4 col-md-6 col-sm-12 mb-4 mb-lg-0'; 
        columns.push(col);
    }
    
    // Distribute images
    portfolioImages.forEach((img, index) => {
        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.className = 'w-100 shadow-1-strong mb-4 imgHover';
        imgEl.onclick = () => openModal(index);
        imgEl.style.cursor = 'pointer';
        
        // Simple distribution: 0->col0, 1->col1, 2->col2, 3->col0...
        columns[index % 3].appendChild(imgEl);
    });
    
    columns.forEach(col => galleryContainer.appendChild(col));
}

let currentModalIndex = 0;

function openModal(index) {
    currentModalIndex = index;
    updateModalContent();
    $("#photoModal").modal('show');
    
    // Update hash for deep linking (optional, keeping clean URL mostly)
    // history.pushState(null, null, '#view=' + portfolioImages[index].id);
}

function updateModalContent() {
    if (currentModalIndex < 0 || currentModalIndex >= portfolioImages.length) return;
    
    const data = portfolioImages[currentModalIndex];
    const imgElement = document.getElementById('imgModal');
    
    // Fade out effect for smoother transition
    imgElement.style.opacity = '0.5';
    
    setTimeout(() => {
        imgElement.setAttribute('src', data.src);
        document.getElementById('location').innerHTML = data.location;
        document.getElementById('year').innerHTML = '(' + data.year + ')';
        document.getElementById('camera').innerHTML = data.camera;
        document.getElementById('phType').innerHTML = data.type;
        imgElement.style.opacity = '1';
    }, 150);
}

function nextImage() {
    currentModalIndex = (currentModalIndex + 1) % portfolioImages.length;
    updateModalContent();
}

function prevImage() {
    currentModalIndex = (currentModalIndex - 1 + portfolioImages.length) % portfolioImages.length;
    updateModalContent();
}

// Helper to bind to window so HTML onclicks work
window.nextImage = nextImage;
window.prevImage = prevImage;


$(document).ready(function(){
  renderGallery();

  // Basic Hash Handling on Load
  const hash = window.location.hash.substring(1);
  if (hash === 'ph' || hash === 'fechas' || hash === 'contact' || hash === 'about') {
      // Allow initial load to settle then switch
      setTimeout(() => showDiv(hash), 500);
  } else {
      showDiv('home'); 
  }

  // Handle modal events
  $('div.modal').on('hidden.bs.modal', function() {
    // Return URL to section
    history.pushState(null, null, '#' + elementoActual);
  });
  
  // Keyboard navigation
  $(document).keydown(function(e) {
    if ($('#photoModal').hasClass('show')) {
        switch(e.which) {
            case 37: // left
            prevImage();
            break;

            case 39: // right
            nextImage();
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }
  });

});




document.addEventListener("DOMContentLoaded", function () {
  const nameElement = document.getElementById("loadName");
  const lastnameElement = document.getElementById("lastname");
  const loaderElement = document.getElementById("loader");

  setTimeout(function () {
      if(lastnameElement) lastnameElement.style.opacity = "0";
  }, 500); 

  setTimeout(function () {
      if(nameElement) nameElement.style.opacity = "0";
  }, 1500); 

  setTimeout(function () {
      if(loaderElement) {
          loaderElement.style.opacity = "0";
          setTimeout(function () {
              loaderElement.style.display = "none";
          }, 1000); 
      }
  
      document.getElementsByTagName('body')[0].style.overflow = 'visible';
    }, 2500); 
});