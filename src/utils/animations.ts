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
        // Add delay before resolving
        gsap.delayedCall(0.5, resolve);
      },
    });
  });
};

export const animateCascade = (elements: HTMLElement[]): Promise<void> => {
  return new Promise((resolve) => {
    // Group elements by column
    const columns = new Map<number, HTMLElement[]>();
    elements.forEach(element => {
      const position = element.getAttribute('data-position');
      if (position) {
        const [x] = position.split('-').map(Number);
        if (!columns.has(x)) {
          columns.set(x, []);
        }
        columns.get(x)?.push(element);
      }
    });

    // Create timeline for coordinated animation
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(elements, { clearProps: 'y' });
        resolve();
      }
    });

    // First phase: Move all existing jewels down together
    const existingJewels = elements.filter(el => 
      el.getAttribute('data-moving') === 'true' && 
      !el.hasAttribute('data-new')
    );

    if (existingJewels.length > 0) {
      timeline.to(existingJewels, {
        y: 0,
        duration: 0.4,
        ease: 'power1.in',
      });
    }

    // Second phase: Fill empty spaces from bottom up
    timeline.addLabel('newJewels', '>');

    columns.forEach((columnElements) => {
      // Sort new jewels by final y position (bottom to top)
      const newJewels = columnElements
        .filter(el => el.hasAttribute('data-new'))
        .sort((a, b) => {
          const [, aY] = a.getAttribute('data-position')?.split('-').map(Number) || [0, 0];
          const [, bY] = b.getAttribute('data-position')?.split('-').map(Number) || [0, 0];
          return bY - aY; // Sort bottom to top
        });

      // Get the jewel size from the first element
      const jewelRect = columnElements[0]?.getBoundingClientRect();
      const jewelSize = jewelRect ? jewelRect.height : 50;

      // Set initial positions for new jewels
      newJewels.forEach(jewel => {
        gsap.set(jewel, {
          y: -jewelSize,
          opacity: 0,
        });
      });

      // Animate new jewels one at a time, bottom to top
      newJewels.forEach((jewel, i) => {
        timeline.to(jewel,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power1.in',
          },
          `newJewels+=${i * 0.15}` // Stagger new jewels with a delay
        );
      });
    });
  });
};
