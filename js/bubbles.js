const bubbles = document.querySelectorAll('.bubble');
const duration = 60;

bubbles.forEach((bubble) => {
  gsap.to(bubble, {
    y: -window.innerHeight / 2,
    duration: duration,
    ease: 'none',
    repeat: -1,
    yoyo: true,
  });
});
