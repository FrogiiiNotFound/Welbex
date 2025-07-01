document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  const animatedTexts = document.querySelectorAll('.text-animate');
  const animatedTextScroll = document.querySelectorAll('.text-animated');

  animatedTexts.forEach((animatedText) => {
    const letters = animatedText.textContent.split('').map((char) => `<span>${char}</span>`);
    animatedText.innerHTML = letters.join('');

    // Анимация при загрузке страницы (быстрее)
    gsap.from(animatedText.querySelectorAll('span'), {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.05,
      // Убираем scrollTrigger
    });
  });

  animatedTextScroll.forEach((animatedText) => {
    const letters = animatedText.textContent.split('').map((char) => `<span>${char}</span>`);
    animatedText.innerHTML = letters.join('');

    // Анимация при скролле для элементов с классом text-animated
    gsap.from(animatedText.querySelectorAll('span'), {
      scrollTrigger: {
        trigger: animatedText,
        start: 'top 85%',
        end: 'top 35%',
        scrub: true,
        // markers: true,
      },
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.05,
    });
  });
});

// ------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

const animationTexts = gsap.utils.toArray('.animation-text');

animationTexts.forEach((section, index) => {
  const text = section.querySelectorAll('.animation-word');
  let animation = gsap.from(text, { y: 100, opacity: 0, stagger: 0.2 });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 70%',
    toggleActions: 'play none none reverse',
    animation: animation,
    markers: false,
  });
});

const animationBlocks = gsap.utils.toArray('.animation-blocks');

animationBlocks.forEach((section, index) => {
  const text = section.querySelectorAll('.animation-block');
  let animation = gsap.from(text, { y: 100, opacity: 0, stagger: 0.4 });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 70%',
    toggleActions: 'play none none reverse',
    animation: animation,
    markers: false,
  });
});

function animateTitle() {
  const titles = document.querySelectorAll('.title-animation');

  titles.forEach((title) => {
    title.classList.remove('title-animation-visible'); // Убираем класс visible
  });
}

function handleScroll() {
  const titles = document.querySelectorAll('.title-animation');

  titles.forEach((title) => {
    const elementTop = title.getBoundingClientRect().top;
    const elementBottom = title.getBoundingClientRect().bottom; // Добавляем нижнюю границу

    // Проверяем, находится ли элемент в пределах видимой области экрана
    const isVisible = elementTop <= window.innerHeight && elementBottom >= 0; // Важно!

    if (isVisible) {
      const delay = parseFloat(title.dataset.delay) || 0;

      if (!title.classList.contains('title-animation-visible')) {
        setTimeout(() => {
          title.classList.add('title-animation-visible');
        }, delay);
      }
    } else {
      title.classList.remove('title-animation-visible'); // Убираем класс visible, если элемент вне зоны видимости
    }
  });
}

// Вызываем animateTitle при загрузке страницы, чтобы скрыть текст изначально
window.addEventListener('load', animateTitle);

// Добавляем обработчик события прокрутки
window.addEventListener('scroll', handleScroll);

// Вызываем handleScroll при загрузке, чтобы проверить видимость при первой загрузке страницы
window.addEventListener('load', handleScroll);
