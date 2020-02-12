import { useEffect } from 'react';
import useIntersectionObserver from './use-intersection-observer-hook';
import { shouldAnimate } from '../motion/constants';

/**
 * React hook that return is the object is intersected
 */
function useGsapMotion({ ref, animateIn, animateInit }, config = {}, rootRef = null) {
  const intersected = useIntersectionObserver(ref, config, rootRef);
  console.log({ ref, animateIn, animateInit });

  useEffect(() => {
    if (shouldAnimate()) {
      animateInit();
    }
  }, [animateInit]);

  useEffect(() => {
    if (shouldAnimate()) {
      if (intersected) animateIn();
    }
  }, [intersected, animateIn]);

  return intersected;
}

export default useGsapMotion;
