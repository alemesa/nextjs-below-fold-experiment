import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import classnames from 'classnames';

import styles from './Copy.module.scss';

import useCSSMotion from '../../utils/hooks/use-css-motion-hook';

function Copy({ className, title, text }) {
  const copyRef = useRef();
  const motionState = useCSSMotion(copyRef);

  return (
    <div
      className={classnames(styles['Copy'], className, {
        [styles.animateInit]: motionState.animateInit,
        [styles.animateIn]: motionState.animateIn
      })}
      ref={copyRef}
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

Copy.propTypes = checkProps({
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
});

Copy.defaultProps = {
  className: '',
  title: '',
  text: ''
};

export default Copy;
