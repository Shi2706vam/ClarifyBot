import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.rightsText}>
          © 2025 All rights reserved by CLARIFY
        </div>
        <div className={styles.designCredit}>
          <p>Designed by{" "}</p>
          <a
            href="https://www.linkedin.com/in/shivam-kumar-7a34a81b9"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.designerLink}
          >
            Shivam Kumar
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;