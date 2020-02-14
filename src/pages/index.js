import React, { useRef, useCallback, useLayoutEffect } from 'react';
import classnames from 'classnames';
import Head from 'next/head';

import gsap from 'gsap';
import SplitText from '../utils/motion/SplitText';

import styles from './index.module.scss';

import Nav from '../components/Nav/Nav';

import { withRedux } from '../redux/withRedux';

import useCSSMotion from '../utils/hooks/use-css-motion-hook';
import useGsapMotion from '../utils/hooks/use-gsap-motion-hook';
import ease from '../utils/motion/eases';

import HeroPic from '../assets/images/hero.jpg';
import ItalyFlag from '../assets/images/italy.png';
import CapoPic from '../assets/images/capo.jpg';
import GreatestPic from '../assets/images/greatest.jpg';
import PizzaPic from '../assets/images/pizza.jpg';

import Image from '../components/Image/Image';
import Copy from '../components/Copy/Copy';

function Landing() {
  const containerRef = useRef();
  const devContainerRef = useRef();
  const devTitle = useRef();
  const devDescription = useRef();
  const mainTitle = useRef();

  const heroMotionState = useCSSMotion(containerRef);

  const animateIn = useCallback(() => {
    gsap
      .timeline()
      .to(devTitle.current, { duration: 0.83, y: 0, autoAlpha: 1, ease: ease.ease1 }, 1)
      .to(devDescription.current, { duration: 0.83, y: 0, autoAlpha: 1, ease: ease.ease1 }, 1.5);
  }, []);

  const animateInit = useCallback(() => {
    gsap.set([devTitle.current, devDescription.current], { y: 80, autoAlpha: 0 });
  }, []);

  const animateCharsInit = useCallback(() => {
    gsap.set(mainTitle.current, { autoAlpha: 0 });
  }, []);

  const animateCharsIn = useCallback(() => {
    const splittedText = new SplitText(mainTitle.current, { type: 'chars, words' });
    gsap.set(containerRef.current, { perspective: 400 });
    gsap.set(mainTitle.current, { autoAlpha: 1 });
    gsap.from(splittedText.chars, {
      duration: 1,
      autoAlpha: 0,
      scale: 0.3,
      y: 100,
      stagger: 0.04,
      onComplete: () => splittedText.revert()
    });
  }, []);

  useGsapMotion({
    ref: mainTitle,
    animateIn: animateCharsIn,
    animateInit: animateCharsInit
  });

  useGsapMotion({ ref: devContainerRef, animateIn, animateInit });

  return (
    <section className={styles.Landing}>
      <Head>
        <title>The battle of Mondello Beach</title>
      </Head>

      <Nav />

      <div
        className={classnames(styles.hero, {
          [styles.animateInit]: heroMotionState.animateInit,
          [styles.animateIn]: heroMotionState.animateIn
        })}
        ref={containerRef}
      >
        <h1 className={styles['second-title']}>The battle of Mondello Beach</h1>

        <h2 className={styles.title} ref={mainTitle}>
          The battle of Mondello Beach with Split
        </h2>

        <p className={styles.description}>
          This was a battle in the beach between some italian dudes and some barbarian from the north, they came down
          from the mountains and start hitting the other italians with pizzas, a huge battle in the beach started and
          left more than 500 gelatos dead in the beach, it was horrible.
        </p>
      </div>

      <Image
        src={HeroPic}
        alt="Battle of Mondello Beach in full display"
        caption="Still from the battle in the beach"
      ></Image>

      <div className={styles.dev} ref={devContainerRef}>
        <h2 className={styles['dev-title']} ref={devTitle}>
          Mondello Battle is considered to be the biggest battle according to historian Alejandro Mesa
        </h2>
        <p className={styles['dev-description']} ref={devDescription}>
          He knows everything
        </p>
      </div>

      <Image src={ItalyFlag} alt="Greatest flag ever" caption="The flag from the Mondello battle"></Image>

      <Copy
        title="Preparation for the Mondello beach battle"
        text="Very random text about how the battle was won by italian"
      />

      <Image src={CapoPic} alt="Good view of the battle form Capo Gallo mountain" caption="Another great view"></Image>

      <Copy
        title="Awesome pics of the battle and the beach"
        text="Alejandro Mesa took some awesome pictures from the mountain, with his super camera and it was very easy to do, he's the best lol"
      />

      <Image src={GreatestPic} alt="Greatest Pic of the battle" caption="Great View"></Image>

      <Copy
        title="Result of the Mondello Beach Battle"
        text="I'm going to trick Google SEO with this website, I will rank #1 on the search results of the Mondello Beach Battle"
      />

      <Image
        src={PizzaPic}
        alt="Awesome pizza picture that was used in the battle of Mondello beach"
        caption="Some of the weapons used in the battle"
      ></Image>

      <Copy
        title="This is an image of the most used weapon in the battle of Mondello Beach"
        text="The battle was very dangerous some people ate too much and gained 10 pounds with all the pizza being thrown around, it was horrible, bunch of poeple in Mondello had to start extreme diets to lose all their weights"
      />

      <Copy
        title="End of the Mondello Beach Battle"
        text="Is all good people are face, the war ended with the Italian victorians - this is the secret of the battle of Mondello beach"
      />

      <Copy title="This is the greatest website" text="Mondello Beach Battle" />
    </section>
  );
}

export default withRedux(Landing);
