import styles from "../styles/Commercial.module.scss";
import Layout from "../components/Layout";
import Figure from "../components/Figure";

import Draggable from "react-draggable";

import client from "../client";
import {useMemo, useState} from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import cs from "../components/languages/cs";
import en from "../components/languages/en";

export default function Commercial(commercial) {
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const { theme } = useTheme();
  const [zIndexes, setZIndexes] = useState(commercial?.galleryArrayWithTags.map((_, index) => index));
  const [showGrab, setShowGrab] = useState(true);

  // <'Fashion', 'Product'>
  const [filter, setFilter] = useState(null)

  const gallery = useMemo(() => {
    if (commercial?.galleryArrayWithTags){
      // filter assets
      let filteredAssets;
      if (filter !== null){
        filteredAssets = commercial.galleryArrayWithTags.filter(item => {
          item.myTags.some(tag => tag.value === filter)
        })
      } else {
        filteredAssets = commercial.galleryArrayWithTags
      }

      // get selected quality
      if (theme === 'highTech'){
        return filteredAssets.map(item => {return {alt: item.alt, image: item.high.asset}})
      } else if (theme === 'lowTech') {
        return filteredAssets.map(item => {return {alt: item.alt, image: item.low.asset}})
      }
    }
    return [];
  }, [commercial, theme, filter])

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

  const getStyles = () => {
    if (theme === "highTech") {
      return styles.commercialGrabHigh;
    } else if (theme === "lowTech") {
      return styles.commercialGrabLow;
    }
  };

  const handleFilter = (newFilter) => {
    if (newFilter === filter){
      setFilter(null)
    } else {
      setFilter(newFilter)
    }
  }

  return (
    <Layout title={t.commercial}>
      <div className={styles.boundParent}>
        <div className={styles.filterContainer}>
          <p onClick={() => handleFilter('fashion')} className={styles.orange}><span>3</span>{t.fashion}</p>
          <p onClick={() => handleFilter('product')} className={styles.yellow}><span>3</span>{t.product}</p>
          <p onClick={() => handleFilter('interior')} className={styles.blue}><span>3</span>{t.interior}</p>
        </div>

        {gallery?.map((item, i) => {
          return (
              <CommercialItem item={item} zIndexes={zIndexes} index={i} changeZ={changeZ} setShowGrab={setShowGrab}/>
          );
        })}
      </div>
      {showGrab && <div className={`${styles.commercialGrab} ${getStyles()}`} />}
    </Layout>
  );
}


function CommercialItem({zIndexes, item, index, changeZ, setShowGrab=setShowGrab}) {

  const [loaded, setLoaded] = useState(false)

    return (
        <Draggable
            key={item._key}
            bounds="parent"
            defaultPosition={{
              x: Math.floor(Math.random() * 150),
              y: Math.floor(Math.random() * 200),
            }}
            onStart={() => {
              changeZ(index)
              setShowGrab(false)
            }}
        >
      <div
          className={`${styles.commercialFigureContainer} ${loaded ? styles.loaded: styles.notLoaded}`}
          style={{zIndex: zIndexes?.[index] ?? 0}}
      >
        <Figure
            handleLoaded={() => setLoaded(true)}
            image={item.image}
            alt={item.alt}
            sizes={`
                      (min-width: 1025px) calc(40vw - 1.43rem * 3), 
                      (min-width: 768px) calc(50vw - 1.43rem * 3), 
                      calc(70vw - 1.43rem * 3) 
                      `}
        />
      </div>
        </Draggable>
  )
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

  // galleryArrayWithTags

  return {
    props: {
      ...commercial,
    },
    revalidate: 10,
  };
}
