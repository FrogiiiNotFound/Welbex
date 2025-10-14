document.querySelectorAll('.accordion-header').forEach((button) => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const content = button.nextElementSibling;

    document.querySelectorAll('.accordion-header').forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.setAttribute('aria-expanded', 'false');
        otherButton.nextElementSibling.setAttribute('aria-hidden', 'true');
        otherButton.nextElementSibling.setAttribute('hidden', '');
      }
    });

    button.setAttribute('aria-expanded', !isExpanded);
    content.setAttribute('aria-hidden', isExpanded);

    if (isExpanded) {
      content.setAttribute('hidden', '');
    } else {
      content.removeAttribute('hidden');
    }
  });
});
