import styles from "../styles/Projects.module.scss";

import Layout from "../components/Layout";
import Figure from "../components/Figure";

import Draggable from "react-draggable";

import client from "../client";
import React, {useMemo, useState} from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import cs from "../components/languages/cs";
import en from "../components/languages/en";
import GalleryBlock from "../components/blocks/GalleryBlock";
import BlockContent from "../components/BlockContent";

export default function Weddings(weddings) {
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const { theme } = useTheme();

  const gallery = useMemo(() => {
    if (weddings?.galleryLowHigh){
      let filteredAssets;

      // get selected quality
      if (theme === 'highTech'){
        filteredAssets = weddings.galleryLowHigh.map(item => {
          return item.high
        })
      } else if (theme === 'lowTech') {
        filteredAssets = weddings.galleryLowHigh.map(item => {
          return item.low
        })
      }
      return filteredAssets
    }
    return [];
  }, [weddings, theme])

  return (
      <Layout title={t.weddings}>
        {gallery && gallery.length > 0 ?
        <div className={styles.projectContainer}>
          <GalleryBlock images={gallery} />
        </div>
            :
            <div className={styles.comingSoon}>
              COMING SOON
            </div>
        }

        {/*<div className={styles.projectInfoContainer}>*/}
        {/*  <BlockContent*/}
        {/*      blocks={router.locale === "cs" ? project.cs : project.en}*/}
        {/*      noLanguage*/}
        {/*  />*/}
        {/*</div>*/}
      </Layout>
  );
}



export async function getStaticProps(context) {
  const weddings = await client.fetch(
      `
    *[_id == "weddings"]  [0] {
      ...,
      }
    
    `,
      ""
  );

  return {
    props: {
      ...weddings,
    },
    revalidate: 10,
  };
}
