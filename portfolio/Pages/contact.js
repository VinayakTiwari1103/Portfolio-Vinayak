import React, { useEffect, useRef, useState } from 'react';
import styles from './contact.module.scss';
import { fadeIn, slideIn } from './gsapAnimations';
import gsap from 'gsap';
import Scrollbar from 'smooth-scrollbar';

export default function Contact() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully');
      } else {
        alert('Error sending message');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  useEffect(() => {
    // Smooth Scroll
    Scrollbar.init(containerRef.current, {
      damping: 0.1,
      alwaysShowTracks: true,
    });

    // Animations
    fadeIn(headingRef.current);
    slideIn(formRef.current);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <section className={styles.hero}>
        {/* <h1 ref={headingRef}>Contact Me</h1>
        <p>Feel free to reach out to discuss your project!</p> */}
      </section>
      <section ref={formRef} className={styles.contactForm}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
