import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import classnames from 'classnames';

import styles from './Image.module.scss';

import useCSSMotion from '../../utils/hooks/use-css-motion-hook';

function Image({ className, src, alt, caption, isSmall }) {
  const imageRef = useRef();

  const motionState = useCSSMotion(imageRef);

  return (
    <figure
      className={classnames(styles['Image'], className, {
        [styles.animateInit]: motionState.animateInit,
        [styles.animateIn]: motionState.animateIn,
        [styles.isSmall]: isSmall
      })}
      ref={imageRef}
    >
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

Image.propTypes = checkProps({
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  caption: PropTypes.string,
  isSmall: PropTypes.bool
});

Image.defaultProps = {
  className: '',
  src: '',
  alt: '',
  caption: '',
  isSmall: false
};

export default Image;
