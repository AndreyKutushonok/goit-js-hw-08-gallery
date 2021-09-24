const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const closeModalRef = document.querySelector('[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay')

function galleryMarkup (gItems){
  return gItems.map(({preview, original, description}) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `
  }).join('');
};

const createMarkup = galleryMarkup(galleryItems);
galleryRef.insertAdjacentHTML('beforeend', createMarkup);

function onImageClick(event){
  event.preventDefault();
  if(!event.target.classList.contains('gallery__image')){
    return;
  };
  
  modalImageRef.src = `${event.target.getAttribute('data-source')}`;
  modalImageRef.alt = `${event.target.getAttribute('alt')}`;
  onOpenModal();
};

galleryRef.addEventListener('click', onImageClick)

function onOpenModal(){
  modalRef.classList.add('is-open');
  window.addEventListener('keydown',onEscKeyPress);
};

function onCloseModal(){
  modalRef.classList.remove('is-open');
  modalImageRef.src = '';
  modalImageRef.alt = '';
  window.removeEventListener('keydown',onEscKeyPress);
};

closeModalRef.addEventListener('click', onCloseModal);
overlayRef.addEventListener('click', onCloseModal);

function onEscKeyPress(event) {
  console.log(event)
  if(event.code === 'Escape'){
    onCloseModal();
  }
};

const originalImagesArray = (images) => { 
  return images.map(image => image.original)};

const imagesArray = originalImagesArray(galleryItems);

function onArrowsPress(event){
  const currentIndex = imagesArray.indexOf(modalImageRef.src);
  if(event.code === 'ArrowLeft'){
    onLeftArrowPress(currentIndex);
  }
  else if (event.code ==='ArrowRight'){
    onRigthArrowPress(currentIndex);
  }
};

function onLeftArrowPress(currentIndex){
  let nextIndex = currentIndex - 1;

  if (nextIndex === -1) {
      nextIndex = imagesArray.length - 1;
  };
  modalImageRef.src = imagesArray[nextIndex];
};

function onRigthArrowPress(currentIndex){
  let nextIndex = currentIndex + 1;

  if (nextIndex === imagesArray.length) {
      nextIndex = 0;
  }
  modalImageRef.src = imagesArray[nextIndex];
};

document.addEventListener('keydown', onArrowsPress);