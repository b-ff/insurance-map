import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import Container from "@components/Container";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">UK Car Insurance price groups by postcode</Link>
        </p>
        <ul className={styles.headerLinks}></ul>
      </Container>
    </header>
  );
};

export default Header;
