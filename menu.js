const body = document.querySelector('body');
const menuIcon = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

menuIcon.addEventListener('click', (e) => {
  menuIcon.classList.toggle('_active');
  menuBody.classList.toggle('_active');
  body.classList.toggle('_active');
});
