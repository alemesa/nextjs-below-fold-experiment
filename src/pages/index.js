import React, { useRef, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import Head from 'next/head';

import gsap from 'gsap';

import styles from './index.module.scss';

import Nav from '../components/Nav/Nav';

import { withRedux } from '../redux/withRedux';

import useCSSMotion from '../utils/hooks/use-css-motion-hook';
import useGsapMotion from '../utils/hooks/use-gsap-motion-hook';
import ease from '../utils/motion/eases';

function Landing() {
  const containerRef = useRef();
  const devContainerRef = useRef();
  const devTitle = useRef();
  const devDescription = useRef();

  const motionState = useCSSMotion(containerRef);

  const animateIn = useCallback(() => {
    gsap
      .timeline()
      .to(devTitle.current, { duration: 0.83, y: 0, autoAlpha: 1, ease: ease.ease1 }, 1)
      .to(devDescription.current, { duration: 0.83, y: 0, autoAlpha: 1, ease: ease.ease1 }, 1.5);
  }, []);

  const animateInit = useCallback(() => {
    gsap.set([devTitle.current, devDescription.current], { y: 80, autoAlpha: 0 });
  }, []);

  useGsapMotion({ ref: containerRef, animateIn, animateInit });

  return (
    <section className={styles.Landing}>
      <Head>
        <title>Home | Jam3 generator</title>
      </Head>

      <Nav />

      <section
        className={classnames(styles.hero, {
          [styles.animateInit]: motionState.animateInit,
          [styles.animateIn]: motionState.animateIn
        })}
        ref={containerRef}
      >
        <h1 className={styles.title}>Welcome to Jam3!</h1>

        <p className={styles.description}>
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>
      </section>

      <section className={styles.dev} ref={devContainerRef}>
        <h2 className={styles['dev-title']} ref={devTitle}>
          Development Team
        </h2>
        <p className={styles['dev-description']} ref={devDescription}>
          We use React for our all projects
        </p>
      </section>
    </section>
  );
}

export default withRedux(Landing);
