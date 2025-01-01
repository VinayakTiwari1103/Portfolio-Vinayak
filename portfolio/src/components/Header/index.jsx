'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname, useRouter } from 'next/navigation'; 
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function Index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {
                    gsap.to(button.current, { scale: 1, duration: 0.25, ease: 'power1.out' });
                },
                onEnterBack: () => {
                    gsap.to(button.current, { scale: 0, duration: 0.25, ease: 'power1.out' }, () => setIsActive(false));
                },
            },
        });
    }, []);


    const routes = {
        Work: 'https://github.com/', // Updated to GitHub link
        RESUME: '/about',
        Contact: 'mailto:tiwarivinayak10@gmail.com', // Mailto link
    };
    
    

    const handleNavClick = (section) => {
        console.log(`Navigating to ${section}`); //  The console.log is added here
        const route = routes[section];
        if (route) {
            router.push(route); 
        } else {
            console.warn(`No route defined for section: ${section}`);
        }
    };

    return (
        <>
            <div ref={header} className={styles.header}>
                <div className={styles.logo}>
                    <p className={styles.copyright}>©</p>
                    <div className={styles.name}>
                        <p className={styles.codeBy}>Code by</p>
                        <p className={styles.dennis}>Vinayak</p>
                        <p className={styles.snellenberg}>Tiwari</p>
                    </div>
                </div>
                <div className={styles.nav}>
                    {Object.keys(routes).map((section) => (
                        <Magnetic key={section}>
                            <div className={styles.el} onClick={() => handleNavClick(section)}>
                                <a>{section}</a> 
                                <div className={styles.indicator}></div>
                            </div>
                        </Magnetic>
                    ))}
                </div>
            </div>
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => setIsActive(!isActive)} className={`${styles.button}`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}></div>
                </Rounded>
            </div>
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    );
}