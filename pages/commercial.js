import styles from "../styles/Commercial.module.scss";
import Layout from "../components/Layout";
import Figure from "../components/Figure";

import Draggable from "react-draggable";

import client from "../client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Commercial(commercial) {
  const { theme, setTheme } = useTheme();
  const [gallery, setGallery] = useState(null);
  const [zIndexes, setZIndexes] = useState(null);
  useEffect(() => {
    if (theme == "highTech" && commercial?.galleryNormal != null) {
      setGallery(commercial.galleryNormal);
      let z = [];
      for (let i = commercial.galleryNormal.length; i > 0; i--) {
        z = [...z, i];
      }
      setZIndexes(z);
    } else if (theme == "lowTech" && commercial?.galleryLow != null) {
      setGallery(commercial.galleryLow);
      let z = [];
      for (let i = commercial.galleryLow.length; i > 0; i--) {
        z = [...z, i];
      }
      setZIndexes(z);
    }
  }, [commercial, theme]);

  const changeZ = (index) => {
    let newZ = [...zIndexes];
    let thresholdIndex = newZ[index];

    for (let i = 0; i < newZ.length; i++) {
      if (newZ[i] > thresholdIndex) {
        newZ[i] = newZ[i] - 1;
      }
    }
    newZ[index] = newZ.length;

    setZIndexes(newZ);
  };

  return (
    <Layout>
      <div className={styles.boundParent}>
        {gallery?.map((image, i) => {
          return (
            <Draggable
              key={image._key}
              bounds="parent"
              defaultPosition={{
                x: Math.floor(Math.random() * 150),
                y: Math.floor(Math.random() * 200),
              }}
              onStart={() => changeZ(i)}
            >
              <div
                className={styles.commercialFigureContainer}
                style={{ zIndex: zIndexes[i] }}
              >
                <Figure
                  image={image}
                  alt={""}
                  sizes={`
                    (min-width: 1025px) calc(40vw - 1.43rem * 3), 
                    (min-width: 768px) calc(50vw - 1.43rem * 3), 
                    calc(70vw - 1.43rem * 3) 
                    `}
                />
              </div>
            </Draggable>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const commercial = await client.fetch(
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
      ...commercial,
    },
    revalidate: 10,
  };
}
