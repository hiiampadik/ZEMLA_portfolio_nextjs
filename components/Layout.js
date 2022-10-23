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
  const [showPage, setShowPage] = useState(true);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.host === "www.zem.la") {
        setShowPage(false);
      }
    }
  }, []);

  const handleQuality = (newTheme) => {
    if (newTheme == "lowTech") {
      setTheme("lowTech");
    } else if (newTheme == "highTech") {
      setTheme("highTech");
    }
  };

  const getContent = () => {
    if (mounted) {
      if (theme === "lowTech" || theme === "highTech") {
        return (
          <div>
            <TopMenu handleQuality={handleQuality} />
            <main className={styles.main}>{children}</main>
          </div>
        );
      } else {
        return <QualitySettings handleQuality={handleQuality} />;
      }
    }
  };

  return (
    <div>
      <Header />
      {showPage ? getContent() : ""}
    </div>
  );
}
