const headers = document.querySelectorAll('.accordion-header');

headers.forEach((header) => {
  header.addEventListener('click', () => {
    const item = header.parentNode;

    // Закрываем все открытые элементы
    document.querySelectorAll('.accordion-item.active').forEach((activeItem) => {
      if (activeItem !== item) {
        // Не закрываем текущий
        activeItem.classList.remove('active');
      }
    });

    // Переключаем класс "active" на текущем элементе
    item.classList.toggle('active');
  });
});