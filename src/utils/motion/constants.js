export const MOTION_STATE = {
  init: 'animateInit',
  in: 'animateIn'
};

const HTML_ANIMATION_CLASSNAME = 'enable-animations';

let animate;
export function shouldAnimate() {
  if (animate !== undefined) return animate;
  return (animate = document.documentElement.classList.contains(HTML_ANIMATION_CLASSNAME));
}

export const INTERSECTION_OBSERVER_CONFIG = {
  threshold: 0.0,
  triggerOnce: true,
  rootMargin: '0px 0px -10%'
};
