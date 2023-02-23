import styles from "../styles/QualitySettings.module.scss";
import stylesDraggable from "../styles/Draggable.module.scss";
import stylesMenu from "../styles/TopMenu.module.scss";

import BlockContent from "./BlockContent";
import AnimatedFigure from "./AnimatedFigure";

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

      {!error && data ? (
        <>
          <AnimatedFigure
            class={`${styles.qualityPhoto} ${quality === 'high' ? styles.qualityPhotoShow : ""}`}
            image={data[0].images.high}
            width={"100%"}
          />
          <AnimatedFigure
            class={`${styles.qualityPhoto} ${quality === 'low' ? styles.qualityPhotoShow : ""}`}
            image={data[0].images.low}
            width={"100%"}
          />
        </>
      ) : (
        ""
      )}

      <div
        className={styles.qualityContainer}
        onMouseOut={() => setQuality(null)}
      >
        <button
          className={styles.qualityHighContainer}
          onClick={() => props.handleQuality("highTech")}
          onMouseOver={() => setQuality("high")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 400 100"
            xmlSpace="preserve"
          >
            <path
              d="M350 1.3c26.9 0 48.7 21.8 48.7 48.7S376.9 98.7 350 98.7H50C23.1 98.7 1.3 76.9 1.3 50S23.1 1.3 50 1.3h300"
              fill="none"
              stroke="#000"
              strokeMiterlimit={10}
              strokeWidth={windowSize.innerWidth >= 1025 ? 400 / (windowSize.innerWidth * 0.48) * 1.5 :  400 / (windowSize.innerWidth * 0.72) * 1.5}
            />
            <path d="M61.1 29.6V47h21.8V29.6H88v40.7h-5.1V51.5H61.1v18.9H56V29.6h5.1zM100.9 29.6v40.7h-5.1V29.6h5.1zM126.3 33.4c-9.7 0-13.8 8.9-13.8 16.6s3 16.6 13.2 16.6c7.3 0 13.3-5.2 13.3-12.9h-13.3v-4.6h18.4v21.2h-3.4l-1.7-5.8h-.1c-3.1 4.3-6.9 6.6-13.2 6.6-11.8 0-18.3-8.9-18.3-21.2 0-12.2 7.6-21.1 18.9-21.1 10.3 0 15.7 5.4 17.1 13.1h-5.1c-1.2-5.8-5.9-8.5-12-8.5zM156.3 29.6V47h21.8V29.6h5.1v40.7h-5.1V51.5h-21.8v18.9h-5.1V29.6h5.1zM213.3 34.2h-13.6v-4.6h32.2v4.6h-13.6v36.2h-5.1V34.2h.1zM263 47v4.6h-20.9v14.2h24.3v4.6H237V29.6h28.8v4.6h-23.6V47H263zM288.9 33.4c-9.7 0-13.7 8.4-13.7 16.6 0 8.3 4 16.6 13.7 16.6 8.5 0 11.8-5.8 12.2-10.9h5.1c-.9 9-7.3 15.5-17.3 15.5-11.2 0-18.9-8.9-18.9-21.2 0-12.2 7.7-21.1 18.9-21.1 10 0 16.3 6.5 17.3 14.2h-5.1c-.7-3.9-3.7-9.7-12.2-9.7zM317.1 29.6V47h21.8V29.6h5.1v40.7h-5.1V51.5h-21.8v18.9H312V29.6h5.1z" />
          </svg>
        </button>
        <button
          className={styles.qualityLowContainer}
          onClick={() => props.handleQuality("lowTech")}
          onMouseOver={() => setQuality("low")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 400 100"
            xmlSpace="preserve"
          >
            <path
              fill="none"
              stroke="#000"
              strokeMiterlimit={10}
              strokeWidth={windowSize.innerWidth >= 1025 ? 400 / (windowSize.innerWidth * 0.48) * 1.5 :  400 / (windowSize.innerWidth * 0.72) * 1.5}
              d="M367.3 1.3L367.3 2.9 367.3 4.2 368.6 4.2 375.9 4.2 375.9 5.8 375.9 7 377.2 7 378.8 7 378.8 8.6 378.8 9.9 380.1 9.9 381.7 9.9 381.7 11.5 381.7 12.8 383 12.8 384.6 12.8 384.6 14.4 384.6 15.7 385.9 15.7 387.5 15.7 387.5 17.3 387.5 18.6 388.8 18.6 390.4 18.6 390.4 20 390.4 21.3 391.7 21.3 393.3 21.3 393.3 25.7 393.3 27 394.6 27 396.2 27 396.2 34.3 396.2 35.6 397.5 35.6 399.1 35.6 399.1 61.6 397.5 61.6 396.2 61.6 396.2 62.9 396.2 70.2 394.6 70.2 393 70.2 393 71.5 393 75.9 391.4 75.9 390.1 75.9 390.1 77.2 390.1 81.6 388.5 81.6 387.2 81.6 387.2 82.9 387.2 84.5 385.6 84.5 384.3 84.5 384.3 85.8 384.3 87.4 382.7 87.4 381.4 87.4 381.4 88.7 381.4 90.3 380 90.3 378.7 90.3 378.7 91.6 378.7 93 374.3 93 373 93 373 94.3 373 95.9 368.6 95.9 367.3 95.9 367.3 97.2 367.3 98.8 357.2 98.8 42.9 98.8 32.7 98.8 32.7 97.2 32.7 95.9 31.4 95.9 27 95.9 27 94.3 27 93 25.7 93 21.3 93 21.3 91.4 21.3 90.1 20 90.1 18.4 90.1 18.4 88.5 18.4 87.2 17.1 87.2 15.5 87.2 15.5 85.6 15.5 84.3 14.2 84.3 12.6 84.3 12.6 82.7 12.6 81.4 11.3 81.4 9.9 81.4 9.9 80 9.9 78.7 8.6 78.7 7 78.7 7 74.3 7 73 5.7 73 4.1 73 4.1 65.7 4.1 64.4 2.9 64.4 1.3 64.4 1.3 38.4 2.9 38.4 4.2 38.4 4.2 37.1 4.2 29.8 5.8 29.8 7 29.8 7 28.5 7 24.1 8.6 24.1 9.9 24.1 9.9 22.8 9.9 18.4 11.5 18.4 12.8 18.4 12.8 17.1 12.8 15.5 14.4 15.5 15.7 15.5 15.7 14.2 15.7 12.6 17.3 12.6 18.6 12.6 18.6 11.3 18.6 9.9 20 9.9 21.3 9.9 21.3 8.6 21.3 7 25.7 7 27 7 27 5.7 27 4.1 31.4 4.1 32.7 4.1 32.7 2.9 32.7 1.3 42.8 1.3 357.1 1.3 367.3 1.3"
            />
            <path d="M48.5 71.2v-2.5h4.9V34.2h-4.9v-2.5h14.8v2.5h-4.9v34.6h14.8v-2.5h2.5v-2.5h2.5v-2.5h2.5v4.9h-2.5v4.9l-29.7.1zM91.7 68.8v-2.5h-2.5v-2.5h-2.5v-4.9h-2.5V44.1h2.5v-4.9h2.5v-2.5h2.5v-2.5h4.9v2.5h-2.5v2.5h-2.5v4.9h-2.5v14.8h2.5v4.9h2.5v2.5h2.5v2.5h-4.9zm4.9-34.6v-2.5H109v2.5H96.6zm0 37v-2.5H109v2.5H96.6zm12.4-2.4v-2.5h2.5v-2.5h2.5v-4.9h2.5V44.1H114v-4.9h-2.5v-2.5H109v-2.5h4.9v2.5h2.5v2.5h2.5v4.9h2.5v14.8h-2.5v4.9h-2.5v2.5h-2.5v2.5H109zM136.2 71.2v-7.4h-2.5v-7.4h-2.5V49h-2.5v-7.4h-2.5v-7.4h-4.9v-2.5h34.6v2.5h-7.4v7.4h2.5V49h2.5v7.4h2.5v7.4h2.5v7.4h-4.9v-7.4H151v-7.4h-2.5V49H146v-7.4h-2.5v-7.4h-12.4v7.4h2.5V49h2.5v7.4h2.5v7.4h2.5v7.4h-4.9zm4.9-7.4v-7.4h2.5v7.4h-2.5zm2.5-7.4V49h2.5v7.4h-2.5zm14.8 7.4v-7.4h2.5v7.4h-2.5zm7.4-22.2v-7.4h-4.9v-2.5h12.4v2.5h-4.9v7.4h-2.6zm-4.9 14.8V49h2.5v7.4h-2.5zm2.4-7.4v-7.4h2.5V49h-2.5zM199.2 71.2v-2.5h4.9V34.2h-9.9v2.5h-2.5v2.5h-2.5v2.5h-2.5v-4.9h2.5v-7.4h2.5v2.5h32.1v-2.5h2.5v7.4h-2.5v4.9h-2.5v-7.4h-12.4v34.6h4.9v2.5h-14.6v-.2zM230.1 71.2v-2.5h4.9V34.2h-4.9v-2.5h27.2v4.9h2.5v4.9h-2.5V39h-2.5v-2.5h-2.5V34h-12.4v15h12.4v-4.9h2.5v12.4h-2.5v-4.9h-12.4v17.3h14.8v-2.5h2.5v-2.5h2.5v-2.5h2.5v4.9h-2.5v4.9h-29.6zM273.3 68.8v-2.5h-2.5v-2.5h-2.5v-4.9h-2.5V44.1h2.5v-4.9h2.5v-2.5h2.5v-2.5h4.9v2.5h-2.5v2.5h-2.5v4.9h-2.5v14.8h2.5v4.9h2.5v2.5h2.5v2.5h-4.9zM298 41.6v-2.5h-2.5v-2.5H293v-2.5h-14.8v-2.5H298v4.9h2.5v4.9H298v.2zm-19.7 29.6v-2.5h14.8v-2.5h2.5v-2.5h2.5v-2.5h2.5v4.9H298V71h-19.7v.2zM305.4 71.2v-2.5h4.9V34.2h-4.9v-2.5h14.8v2.5h-4.9V49h17.3V34.2h-4.9v-2.5h14.8v2.5h-4.9v34.6h4.9v2.5h-14.8v-2.5h4.9V51.5h-17.3v17.3h4.9v2.5h-14.8v-.1z" />
          </svg>
        </button>
      </div>

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
