import { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import { MOTION_STATE } from '../motion/constants';
import useIntersectionObserver from './use-intersection-observer-hook';
import { isBrowser } from '../../utils/basic-functions';

/**
 * React hook that return is the object is intersected
 */
function useCSSMotion(ref, config = {}, rootRef = null) {
  const intersected = useIntersectionObserver(ref, config, rootRef);
  const [init, setInit] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (isBrowser) setInit(true);
  }, []);

  return {
    [MOTION_STATE.init]: init,
    [MOTION_STATE.in]: intersected
  };
}

export default useCSSMotion;
