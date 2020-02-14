import { useIsomorphicLayoutEffect } from 'react-use';
import useIntersectionObserver from './use-intersection-observer-hook';
import { shouldAnimate } from '../motion/constants';

/**
 * React hook that return is the object is intersected
 */
function useGsapMotion({ ref, animateIn, animateInit }, config = {}, rootRef = null) {
  const intersected = useIntersectionObserver(ref, config, rootRef);

  useIsomorphicLayoutEffect(() => {
    if (shouldAnimate()) {
      animateInit();
    }
  }, [animateInit]);

  useIsomorphicLayoutEffect(() => {
    if (shouldAnimate()) {
      if (intersected) animateIn();
    }
  }, [intersected, animateIn]);

  return intersected;
}

export default useGsapMotion;
