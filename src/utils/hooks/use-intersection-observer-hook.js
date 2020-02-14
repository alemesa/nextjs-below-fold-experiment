import { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { INTERSECTION_OBSERVER_CONFIG } from '../motion/constants';

/**
 * React hook that return is the object is intersected
 */
function useIntersectionObserver(ref, config = {}, rootRef = null) {
  const [isIntersecting, setIntersecting] = useState(false);

  const options = {
    root: rootRef && rootRef.current,
    ...INTERSECTION_OBSERVER_CONFIG,
    ...config
  };

  useIsomorphicLayoutEffect(() => {
    const observer = new IntersectionObserver(function(entries) {
      if (options.triggerOnce) {
        if (entries[0].isIntersecting) {
          setIntersecting(true);
          observer.unobserve(ref.current);
        }
      } else {
        setIntersecting(entries[0].isIntersecting);
      }
    }, options);

    if (!ref || !ref.current) {
      console.warn(`No target specified - use useRef() hook to pass the target value`);
      return;
    }

    const { current } = ref;

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  }, [options, ref, options.triggerOnce]);

  return isIntersecting;
}

export default useIntersectionObserver;
