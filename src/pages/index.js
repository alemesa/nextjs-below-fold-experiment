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

  useGsapMotion({ ref: devContainerRef, animateIn, animateInit });

  return (
    <section className={styles.Landing}>
      <Head>
        <title>The battle of Mondello Beach</title>
      </Head>

      <Nav />

      <section
        className={classnames(styles.hero, {
          [styles.animateInit]: heroMotionState.animateInit,
          [styles.animateIn]: heroMotionState.animateIn
        })}
        ref={containerRef}
      >
        <h1 className={styles.title}>The battle of Mondello Beach</h1>

        <p className={styles.description}>
          This was a battle between some italian dudes and some barbarian from the north, they came down from the
          mountains and start hitting the other italians with pizzas, a huge battle started and left more than 500
          gelatos dead in the beach, it was horrible.
        </p>
      </section>

      <Image src={HeroPic} alt="Battle of Mondello in full display" caption="Still from the battle"></Image>

      <section className={styles.dev} ref={devContainerRef}>
        <h2 className={styles['dev-title']} ref={devTitle}>
          Mondello Battle is considered to be the biggest battle according to historian Alejandro Mesa
        </h2>
        <p className={styles['dev-description']} ref={devDescription}>
          He knows everything
        </p>
      </section>

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
        alt="Awesome pizza picture that was used in the battle of Mondello"
        caption="Some of the weapons used in the battle"
      ></Image>

      <Copy
        title="This is an image of the most used weapon in the battle of Mondello Beach"
        text="The battle was very dangerous some people ate too much and gained 10 pounds with all the pizza being thrown around, it was horrible, bunch of poeple in Mondello had to start extreme diets to lose all their weights"
      />

      <Copy
        title="End of the Mondello Battle"
        text="Is all good people are face, the war ended with the Italian victorians"
      />

      <Copy title="This is the greatest website" text="Mondello Beach Battle" />
    </section>
  );
}

export default withRedux(Landing);
