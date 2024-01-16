import Container from "@components/Container";

import styles from "./Footer.module.scss";

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <Container className={`${styles.footerContainer} ${styles.footerLegal}`}>
        <p>
          <a href="https://t.me/automotive_uk">https://t.me/automotive_uk</a> —
          guide into UK motoring world for immigrants
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
