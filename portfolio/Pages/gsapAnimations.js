import gsap from 'gsap';

export const fadeIn = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, delay, ease: 'power3.out' }
  );
};

export const slideIn = (element, direction = 'left') => {
  const xValue = direction === 'left' ? -100 : 100;
  gsap.fromTo(
    element,
    { x: xValue, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
  );
};
