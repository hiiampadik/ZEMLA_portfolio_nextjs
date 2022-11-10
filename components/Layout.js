import Header from "../components/Head";
import Footer from "../components/Footer";
import TopMenu from "../components/TopMenu";
import QualitySettings from "./QualitySettings";

import React, { useState, useEffect } from "react";

import styles from "../styles/Layout.module.scss";

import { propTypes } from "@sanity/block-content-to-react";
import { useTheme } from "next-themes";

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();
  const [showSvatba, setShowSvatba] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);


  const getContent = () => {
    if (mounted) {
        return (
          <div>
            <TopMenu  />
            <main className={styles.main}>{children}</main>
          </div>
        );

    }
  };

  return (
    <div>
      <Header />

      {showSvatba ? (
        <main className={styles.main}>{children}</main>
      ) : (
        <>
            {getContent()}
          
        </>
      )}
    </div>
  );
}
