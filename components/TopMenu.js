import styles from "../styles/TopMenu.module.scss";
import React, { useState } from "react";
import Link from "next/link";

import About from "./About";

import { useRouter } from "next/router";
import cs from "./languages/cs";
import en from "./languages/en";

import { useTheme } from "next-themes";

export default function TopMenu(props) {
  const [showAbout, setShowAbout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;
  const languageButton = router.locale === "cs" ? "en" : "cz";

  const { theme, setTheme } = useTheme();

  const handleMenu = () => {
    setShowMenu((i) => !i);
  };

  return (
    <nav>

      <ContainerMenu
        handleMenu={handleMenu}
        t={t}
        router={router}
        showMenu={showMenu}
        theme={theme}
        languageButton={languageButton}
      />

      {router.pathname !== "/projects/[slug]" ? (
        <>
          <div className={styles.navFooter}>
            <a href="mailto:petr@zem.la">petr@zem.la</a>
            <a href="https://www.instagram.com/zem.la/">Instagram</a>
          </div>
        </>
      ) : (
        ""
      )}
      {/* <div className={styles.navAbout} onClick={() => setShowAbout(!showAbout)}>
        <p>{t.about}</p>
      </div> */}

      {showAbout ? <About handleClose={() => setShowAbout(false)} /> : ""}
    </nav>
  );
}

function ContainerMenu(props) {
  return (
    <div className={styles.nav}>
      <div className={`${styles.navLeftContainer} `}>
        <Link href={"/"} locale={props.router.locale}>
          Petr Žemla
        </Link>
      </div>

      <div className={styles.navCenterContainer}>

      </div>


      <div className={styles.navRightContainer}>
        <Link
          href={props.router.asPath}
          locale={props.languageButton == "en" ? "en" : "cs"}
        >
          {props.languageButton}
        </Link>
      </div>

      <div className={styles.navBg}></div>
    </div>
  );
}

function MenuWindow(props) {
  const router = useRouter();

  const t = router.locale === "cs" ? cs : en;

  return (
    <div className={styles.menuWindowContainer}>
      <div className={styles.menuWindowTop}>
        <Link href={"/projects"} locale={router.locale}>
          {t.projects}
        </Link>
        <Link href={"/commerce"} locale={router.locale}>
          {t.commerce}
        </Link>
        <Link href={"/films"} locale={router.locale}>
          {t.films}
        </Link>
        {/* <Link href={"/print"} locale={router.locale}>
          {t.print}
        </Link> */}
        <Link href={"/articles"} locale={router.locale}>
          {t.articles}
        </Link>
      </div>

      <div
        onClick={() => props.handleMenu()}
        className={styles.menuWindowClose}
      ></div>
    </div>
  );
}
