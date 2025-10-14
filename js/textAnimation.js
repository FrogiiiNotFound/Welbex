// first animation

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
    title.classList.remove('title-animation-visible');
  });
}

function handleScroll() {
  const titles = document.querySelectorAll('.title-animation');

  titles.forEach((title) => {
    const elementTop = title.getBoundingClientRect().top;
    const elementBottom = title.getBoundingClientRect().bottom;

    const isVisible = elementTop <= window.innerHeight && elementBottom >= 0;

    if (isVisible) {
      const delay = parseFloat(title.dataset.delay) || 0;

      if (!title.classList.contains('title-animation-visible')) {
        setTimeout(() => {
          title.classList.add('title-animation-visible');
        }, delay);
      }
    } else {
      title.classList.remove('title-animation-visible');
    }
  });
}

window.addEventListener('load', animateTitle);

window.addEventListener('scroll', handleScroll);

window.addEventListener('load', handleScroll);

// ------------------------------------------------

// second animation

gsap.registerPlugin(ScrollTrigger);

function initTextAnimations() {
  const textElements = document.querySelectorAll('.animated-text');

  textElements.forEach((element) => {
    const originalText = element.textContent;

    const animationType = element.dataset.animation || 'fadeUp';
    const stagger = parseFloat(element.dataset.stagger) || 0.03;
    const duration = parseFloat(element.dataset.duration) || 1;
    const delay = parseFloat(element.dataset.delay) || 0;

    element.innerHTML = '';
    element.style.opacity = 1;

    const words = originalText.split(' ');
    const allLetterSpans = [];

    words.forEach((word, wordIndex) => {
      const wordWrapper = document.createElement('span');
      wordWrapper.style.display = 'inline-block';
      wordWrapper.style.whiteSpace = 'nowrap';

      const letters = word.split('').map((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        wordWrapper.appendChild(span);
        return span;
      });

      allLetterSpans.push(...letters);
      element.appendChild(wordWrapper);

      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.textContent = '\u00A0';
        spaceSpan.style.display = 'inline-block';
        spaceSpan.style.whiteSpace = 'nowrap';
        element.appendChild(spaceSpan);

        spaceSpan.style.opacity = '0';
        allLetterSpans.push(spaceSpan);
      }
    });

    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      },
      scale: {
        from: { opacity: 0, scale: 0 },
        to: { opacity: 1, scale: 1 },
      },
      rotate: {
        from: { opacity: 0, rotationY: 90 },
        to: { opacity: 1, rotationY: 0 },
      },
      bounce: {
        from: { opacity: 0, y: -100 },
        to: { opacity: 1, y: 0 },
      },
    };

    const animation = animations[animationType];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      allLetterSpans,
      {
        ...animation.from,
      },
      {
        ...animation.to,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: 'back.out(1.7)',
      },
    );
  });
}

document.addEventListener('DOMContentLoaded', initTextAnimations);
