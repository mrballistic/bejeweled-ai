export const animateSwap = (from: HTMLElement, to: HTMLElement): Promise<void> => {
  return new Promise((resolve) => {
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;

    from.style.transition = 'transform 0.3s ease';
    to.style.transition = 'transform 0.3s ease';

    from.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    to.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;

    setTimeout(() => {
      from.style.transition = '';
      to.style.transition = '';
      from.style.transform = '';
      to.style.transform = '';
      resolve();
    }, 300);
  });
};

export const animateMatch = (elements: HTMLElement[]): Promise<void> => {
  return new Promise((resolve) => {
    elements.forEach((el) => {
      el.style.transition = 'opacity 0.3s ease';
      el.style.opacity = '0';
    });

    setTimeout(() => {
      elements.forEach((el) => {
        el.style.transition = '';
        el.style.opacity = '';
      });
      resolve();
    }, 300);
  });
};

export const animateCascade = (elements: HTMLElement[]): Promise<void> => {
  return new Promise((resolve) => {
    elements.forEach((el) => {
      el.style.transition = 'transform 0.3s ease';
      el.style.transform = 'translateY(50px)';
    });

    setTimeout(() => {
      elements.forEach((el) => {
        el.style.transition = '';
        el.style.transform = '';
      });
      resolve();
    }, 300);
  });
};
