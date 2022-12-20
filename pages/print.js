import styles from "../styles/Print.module.scss";
import Layout from "../components/Layout";
import Figure from "../components/Figure";
import BlockContent from "../components/BlockContent";

import client from "../client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import cs from "../components/languages/cs";
import en from "../components/languages/en";

export default function Print(print) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const getImage = (image) => {
    if (theme == "highTech" && image?.imageNormal != null) {
      return image.imageNormal;
    } else if (theme == "lowTech" && image?.imageLow != null) {
      return image.imageLow;
    }
  };

  const getImageDescription = (image) => {
    if (!image.available){
      return (`${t.notavailable}`)
    } else if (image.description === '1'){
      return (`${image.description} ${t.piece}`)
    } else {
      return (`${image.description} ${t.pieces}`)
    }
  };

  return (
    <Layout>
      <div className={styles.printInfoContainer}>
        <BlockContent
          blocks={router.locale === "cs" ? print.cs : print.en}
          noLanguage
        />
      </div>
      {console.log(print)}
      <div className={styles.printPhotoContainer}>
        {print?.gallery?.map((image) => {
          return (
            <div>
              <h1>{getImageDescription(image)}</h1>
              <div
                key={image._key}
                className={`${styles.printPhotoWrap} ${
                  !image.available ? styles.printPhotoAvailable : ""
                }`}
              >
                <Figure image={getImage(image)} alt={""} />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const print = await client.fetch(
    `
    *[_id == "print"]  [0] {
      ...,
      "gallery":gallery[]{..., asset->{...}},
      }
    
    `,
    ""
  );

  return {
    props: {
      ...print,
    },
    revalidate: 10,
  };
}
