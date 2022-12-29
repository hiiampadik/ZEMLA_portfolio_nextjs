import styles from "../styles/QualitySettings.module.scss";

import { useSpring } from "@react-spring/web";
import BlockContent from "./BlockContent";
import AnimatedFigure from "./AnimatedFigure";

import useSWR from "swr";
import sanityClient from "@sanity/client";
import groq from "groq";
import { useRouter } from "next/router";
import Link from "next/link";

import React, { useState } from "react";

import Typewriter from "../components/Typewriter";


export default function QualitySettings(props) {
  const [showAbout, setShowAbout] = useState(false);
  const router = useRouter();
  const languageButton = router.locale === "cs" ? "En" : "Cz";

  const client = sanityClient({
    projectId: "3w5q4fmv",
    dataset: "pzdataset",
    useCdn: true,
  });
  const { data, error } = useSWR(groq`*[_id == "qualitySettings"]`, (query) =>
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

  const lowQuality = useSpring({
    from: { opacity: 0, transform: "translate(-50%, -50%)" },
    to: {
      opacity: quality == "low" ? 1 : 0,
      transform:
        quality == "low" ? "translate(-50%, -50%)" : "translate(-50%, -48%)",
    },
  });

  const highQuality = useSpring({
    from: { opacity: 0, transform: "translate(-50%, -50%)" },
    to: {
      opacity: quality == "high" ? 1 : 0,
      transform:
        quality == "high" ? "translate(-50%, -50%)" : "translate(-50%, -48%)",
    },
  });

  return (
    <div className={styles.qualitySettingsContainer}>
      
      <div className={styles.qualityLeft}>
        <Link href={"/"} locale={router.locale}>
          Petr Žemla
        </Link>
      </div>

      <Typewriter />

      <div className={styles.qualityRight}>
        <Link
          href={router.asPath}
          locale={languageButton == "En" ? "En" : "Cs"}
        >
          {languageButton}
        </Link>
      </div>

      {!error && data ? (
        <>
          <AnimatedFigure
            class={styles.qualityPhoto}
            style={highQuality}
            image={data[0].images.high}
            width={"100%"}
          />
          <AnimatedFigure
            class={styles.qualityPhoto}
            style={lowQuality}
            image={data[0].images.low}
            width={"100%"}
          />
        </>
      ) : (
        ""
      )}

      <button
        className={styles.qualityHighContainer}
        onClick={() => props.handleQuality("highTech")}
        onMouseOver={() => setQuality("high")}
        onMouseOut={() => setQuality(null)}
      ></button>
      <button
        className={styles.qualityLowContainer}
        onClick={() => props.handleQuality("lowTech")}
        onMouseOver={() => setQuality("low")}
        onMouseOut={() => setQuality(null)}
      ></button>
    </div>
  );
}
