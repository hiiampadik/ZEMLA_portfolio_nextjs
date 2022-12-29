import Header from "../components/Head";
import Footer from "../components/Footer";
import TopMenu from "../components/TopMenu";
import QualitySettings from "./QualitySettings";

import React, { useState, useEffect } from "react";

import styles from "../styles/Layout.module.scss";

import { useTheme } from "next-themes";

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
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
      {getContent()}
    </div>
  );
}
