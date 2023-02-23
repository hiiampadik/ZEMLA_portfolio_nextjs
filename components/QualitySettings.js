import styles from "../styles/QualitySettings.module.scss";
import stylesDraggable from "../styles/Draggable.module.scss";
import stylesMenu from "../styles/TopMenu.module.scss";

import BlockContent from "./BlockContent";
import Figure from "./Figure";

import useSWR from "swr";
import sanityClient from "@sanity/client";
import groq from "groq";
import {useRouter} from "next/router";
import cs from "./languages/cs";
import en from "./languages/en";

import React, {useState, useEffect} from "react";
import Draggable from "react-draggable";

import Typewriter from "../components/Typewriter";

export default function QualitySettings(props) {
  const [showAbout, setShowAbout] = useState(false);
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const client = sanityClient({
    projectId: "3w5q4fmv",
    dataset: "pzdataset",
    useCdn: true,
  });
  const {data, error} = useSWR(groq`*[_id == "qualitySettings"]`, (query) =>
    client.fetch(query)
  );

  const getContent = () => {
    if (error) {
      return "Error...";
    } else if (!data) {
      return "";
    } else {
      return <BlockContent blocks={data[0].text} />;
      // return props.data[0].text.cs;
    }
  };

  const [quality, setQuality] = useState(null);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <nav className={styles.qualitySettingsContainer}>
      {/* <Typewriter /> */}

      {!error && data &&
        <div className={styles.qualityContainer}>
          <button
            className={styles.qualityHighContainer}
            onClick={() => props.handleQuality("highTech")}
          >
            <Figure
              image={data[0].images.high}
            />
            <h1>HIGH</h1>
          </button>
          <button
            className={styles.qualityLowContainer}
            onClick={() => props.handleQuality("lowTech")}
          >
            <Figure
              image={data[0].images.low}
            />
            <h1>LOW</h1>
          </button>
        </div>
    }

      <div
        className={stylesMenu.navAbout}
        onClick={() => setShowAbout(!showAbout)}
      >
        <p>{t.question}</p>
      </div>
      {!error && data && showAbout ? (
        <Help setShowAbout={setShowAbout} getContent={getContent} />
      ) : (
        ""
      )}
    </nav>
  );
}

function Help(props) {
  return (
    <div className={stylesDraggable.boundParent}>
      <Draggable handle="span" bounds="parent">
        <div
          className={`${stylesDraggable.draggableContainer} ${stylesDraggable.qualityContainer}`}
        >
          <span>
            <div className={stylesDraggable.draggableHeader}></div>
          </span>
          <div
            onClick={() => props.setShowAbout(false)}
            className={stylesDraggable.draggableClose}
          ></div>
          <div className={stylesDraggable.draggableContent}>
            {props.getContent()}
          </div>
        </div>
      </Draggable>
    </div>
  );
}

function getWindowSize() {
  if (typeof window !== "undefined") {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  } else {
    return null;
  }
}
