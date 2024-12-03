'use client';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let locomotiveScrollInstance;

    const loadLocomotiveScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        locomotiveScrollInstance = new LocomotiveScroll();
      } catch (error) {
        console.error('Failed to load LocomotiveScroll:', error);
      }
    };

    loadLocomotiveScroll();

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      if (locomotiveScrollInstance) {
        locomotiveScrollInstance.destroy();
      }
    };
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      {/* <SlidingImages /> */}
      <Contact />
    </main>
  );
}
