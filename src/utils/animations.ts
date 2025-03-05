import gsap from 'gsap';

export const animateSwap = (from: HTMLElement, to: HTMLElement): Promise<void> => {
  return new Promise((resolve) => {
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;

    gsap.to(from, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    gsap.to(to, {
      x: -deltaX,
      y: -deltaY,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set([from, to], { clearProps: 'x,y' });
        resolve();
      },
    });
  });
};

export const animateMatch = (elements: HTMLElement[]): Promise<void> => {
  return new Promise((resolve) => {
    gsap.to(elements, {
      scale: 1.2,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      stagger: {
        amount: 0.2,
        from: 'center',
      },
      onComplete: () => {
        gsap.set(elements, { clearProps: 'scale,opacity' });
        resolve();
      },
    });
  });
};

export const animateCascade = (elements: HTMLElement[]): Promise<void> => {
  return new Promise((resolve) => {
    const startPositions = elements.map(el => {
      const rect = el.getBoundingClientRect();
      return {
        element: el,
        startTop: rect.top,
      };
    });

    // First pass: get final positions
    gsap.set(elements, { clearProps: 'transform' });

    // Second pass: calculate and apply animations
    const animations = startPositions.map(({ element, startTop }) => {
      const endRect = element.getBoundingClientRect();
      const deltaY = endRect.top - startTop;

      return {
        element,
        deltaY,
      };
    });

    // Find the maximum fall distance to scale the duration
    const maxDeltaY = Math.max(...animations.map(a => Math.abs(a.deltaY)));
    const baseDuration = 0.5; // Base duration for short falls
    const maxDuration = 1.2; // Maximum duration for long falls
    
    // Scale duration based on fall distance, with a minimum of baseDuration
    const duration = Math.min(
      maxDuration,
      baseDuration + (maxDeltaY / 400) // Adjust the divisor to tune the scaling
    );

    // Apply animations
    gsap.fromTo(
      elements,
      {
        y: (i) => -animations[i].deltaY,
      },
      {
        y: 0,
        duration,
        ease: 'bounce.out',
        stagger: {
          amount: 0.4, // Increased stagger amount
          from: 'start',
        },
        onComplete: () => {
          gsap.set(elements, { clearProps: 'y' });
          resolve();
        },
      }
    );
  });
};
