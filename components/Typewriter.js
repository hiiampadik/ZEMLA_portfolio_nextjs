import styles from "../styles/QualitySettings.module.scss";



import Typewriter from "typewriter-effect";

export default function TypeWriter({strings, language}) {

  return (
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .pauseFor(600)
              .typeString(strings[0])
              .pauseFor(1000)
              .deleteChars(language === "cs" ? 17 : 16)
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
              .deleteChars(language === "cs" ? 23 : 22)
              .pauseFor(300)
              .typeString(strings[7])
              .pauseFor(500)
              .deleteChars(language === "cs" ? 20 : 19)
              .pauseFor(300)
              .typeString(strings[8])
              .pauseFor(500)
              .deleteChars(language === "cs" ? 21 : 20)
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
