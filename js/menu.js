document.addEventListener('DOMContentLoaded', function () {
  const navigationConfig = {
    menu__link1: { target: 'home', offset: 0 },
    menu__link2: { target: 'calculation', offset: 50 },
    menu__link3: { target: 'services', offset: 100 },
    menu__link4: { target: 'widgets', offset: 80 },
    menu__link5: { target: 'free', offset: 120 },
  };

  function scrollToElement(targetElement, offset = 0) {
    const elementRect = targetElement.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const targetPosition = absoluteElementTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }

  Object.keys(navigationConfig).forEach((linkClass) => {
    const links = document.querySelectorAll(`.${linkClass}`);
    const target = document.querySelector(`.${navigationConfig[linkClass].target}`);
    const offset = navigationConfig[linkClass].offset;

    if (links.length > 0 && target) {
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          scrollToElement(target, offset);
        });
      });
    }
  });
});
