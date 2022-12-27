import styles from "../styles/Commerce.module.scss";
import Layout from "../components/Layout";
import Figure from "../components/Figure";

import Draggable from "react-draggable";

import Link from "next/link";
import client from "../client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Commerce(commerce) {
  const { theme, setTheme } = useTheme();
  const [gallery, setGallery] = useState(null);
  const [zIndexes, setZIndexes] = useState(null);
  useEffect(() => {
    if (theme == "highTech" && commerce?.galleryNormal != null) {
      setGallery(commerce.galleryNormal);
      let z = [];
      for (let i = commerce.galleryNormal.length; i > 0; i--) {
        z = [...z, i];
      }
      setZIndexes(z);
    } else if (theme == "lowTech" && commerce?.galleryLow != null) {
      setGallery(commerce.galleryLow);
      let z = [];
      for (let i = commerce.galleryLow.length; i > 0; i--) {
        z = [...z, i];
      }
      setZIndexes(z);
    }
  }, [commerce, theme]);

  const changeZ = (index) => {
    let newZ = [...zIndexes];

    for (let i = 0; i < newZ.length; i++) {
      newZ[i] = newZ[i] - 1;
    }
    newZ[index] = 1 + (newZ.length - 1);

    setZIndexes(newZ)
  };

  return (
    <Layout>
      <div className={styles.boundParent}>
        {gallery?.map((image, i) => {
          return (
            <Draggable
              key={image._key}
              bounds="parent"
              defaultPosition={{ x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 200) }}
              onStart={() => changeZ(i)}
            >
              <div
                className={styles.commerceFigureContainer}               
                style={{zIndex: zIndexes[i]}}
              >
                <Figure image={image} alt={""} figureType={"commerce"} />
              </div>
            </Draggable>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const commerce = await client.fetch(
    `
    *[_id == "commerce"]  [0] {
      ...,
      "galleryNormal":galleryNormal[]{..., asset->{...}},
      "galleryLow":galleryLow[]{..., asset->{...}},
      }
    
    `,
    ""
  );

  return {
    props: {
      ...commerce,
    },
    revalidate: 10,
  };
}
