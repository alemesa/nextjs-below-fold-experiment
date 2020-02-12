import { MOTION_STATE } from '../motion/constants';
import useIntersectionObserver from './use-intersection-observer-hook';

/**
 * React hook that return is the object is intersected
 */
function useCSSMotion(ref, config = {}, rootRef = null) {
  const intersected = useIntersectionObserver(ref, config, rootRef);

  return {
    [MOTION_STATE.init]: true,
    [MOTION_STATE.in]: intersected
  };
}

export default useCSSMotion;
