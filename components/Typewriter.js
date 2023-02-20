import styles from "../styles/QualitySettings.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


import Typewriter from "typewriter-effect";

export default function Home(galleries) {
  const router = useRouter();
  const [strings, setStrings] = useState(null);

  useEffect(() => {
    if (router.locale === "cs") {
      setStrings([
        "Fotogarfické portfolio",
        "rafické potrfolio",
        " protfolio",
        " portfoiol",
        "rtfolium",
        "otrfoloi",
        " prftoliot",
        "togarfckié ptrooflio",
        "otgaréfcki prlftoooi",
        "fgtrkcooaié frtpliooo",
      ]);
    } else {
      setStrings([
        "Photogarphy portfolio",
        "graphy potrfolio",
        " protfolio",
        " portfoiol",
        "rtfolium",
        "otrfoloi",
        " prftoliot",
        "ootgrpahy ptrooflio",
        "otogarphy prlftoooi",
        "fgtrgcooay frtpliooo",
      ]);
    }
  }, [router]);


  return (
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .pauseFor(600)
              .typeString(strings[0])
              .pauseFor(1000)
              .deleteChars(router.locale === "cs" ? 17 : 16)
              .pauseFor(300)
              .typeString(strings[1])
              .pauseFor(1300)
              .deleteChars(9)
              .pauseFor(400)
              .typeString(strings[2])
              .pauseFor(1500)
              .deleteChars(9)
              .pauseFor(600)
              .typeString(strings[3])
              .pauseFor(900)
              .deleteChars(7)
              .pauseFor(400)
              .typeString(strings[4])
              .pauseFor(700)
              .deleteChars(9)
              .pauseFor(300)
              .typeString(strings[5])
              .pauseFor(900)
              .deleteChars(9)
              .pauseFor(300)
              .typeString(strings[6])
              .pauseFor(900)
              .deleteChars(router.locale === "cs" ? 23 : 22)
              .pauseFor(300)
              .typeString(strings[7])
              .pauseFor(500)
              .deleteChars(router.locale === "cs" ? 20 : 19)
              .pauseFor(300)
              .typeString(strings[8])
              .pauseFor(500)
              .deleteChars(router.locale === "cs" ? 21 : 20)
              .pauseFor(1100)
              .typeString(strings[9])
              .pauseFor(400)

              .deleteAll()

              .start();
          }}
          options={{
            autoStart: true,
            cursor: "",
            loop: true,
            delay: 40,
            deleteSpeed: 50,
            wrapperClassName: styles.landingTypewriter,
          }}
        />
  );
}
