import { useIsomorphicLayoutEffect } from 'react-use';
import useIntersectionObserver from './use-intersection-observer-hook';

/**
 * React hook that return is the object is intersected
 */
function useGsapMotion({ ref, animateIn, animateInit }, config = {}, rootRef = null) {
  const intersected = useIntersectionObserver(ref, config, rootRef);

  useIsomorphicLayoutEffect(() => {
    animateInit();
  }, [animateInit]);

  useIsomorphicLayoutEffect(() => {
    if (intersected) animateIn();
  }, [intersected, animateIn]);

  return intersected;
}

export default useGsapMotion;
