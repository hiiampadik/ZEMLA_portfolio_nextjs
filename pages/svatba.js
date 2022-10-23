import styles from "../styles/Svatba.module.scss";
import Layout from "../components/Layout";

import BlockContent from "../components/BlockContent";

import Draggable from "react-draggable";

import Link from "next/link";
import client from "../client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Svatba(svatba) {
  const { theme, setTheme } = useTheme();
  const [gallery, setGallery] = useState(null);
  const [zIndexes, setZIndexes] = useState(null);

  useEffect(() => {
    setTheme("highTech");
  }, []);

  return (
    <Layout>
      <div className={styles.svatbaWrap}>
        <div className={styles.svatbaContainer}>
          <BlockContent blocks={svatba.text} noLanguage />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const svatba = await client.fetch(
    `
    *[_id == "svatba"]  [0] {
      ...,
      }
    
    `,
    ""
  );

  return {
    props: {
      ...svatba,
    },
    revalidate: 10,
  };
}
