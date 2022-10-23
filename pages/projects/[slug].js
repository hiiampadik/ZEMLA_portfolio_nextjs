import styles from "../../styles/Projects.module.scss";
import window from "../../styles/About.module.scss";

import BlockContent from "../../components/BlockContent";
import GalleryBlock from "../../components/blocks/GalleryBlock";

import Draggable from "react-draggable";

import Layout from "../../components/Layout";
import client from "../../client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import cs from "../../components/languages/cs";
import en from "../../components/languages/en";

export default function Project(project) {
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const [gallery, setGallery] = useState(null);
  const { theme, setTheme } = useTheme();

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (theme === "highTech" && project?.galleryNormal != null) {
      setGallery(project.galleryNormal);
    } else if (theme == "lowTech" && project?.galleryLow != null) {
      setGallery(project.galleryLow);
    }
  }, [project, theme]);

  return (
    <Layout>
      <div className={styles.projectContainer}>
        {gallery ? <GalleryBlock images={gallery} /> : ""}
      </div>
      {/* <div
        className={styles.projectInfoButton}
        onClick={() => setShowInfo(!showInfo)}
      >
        <p>{t.info}</p>
      </div> */}

      <div className={styles.projectInfoContainer}>
        <BlockContent
          blocks={router.locale === "cs" ? project.cs : project.en}
          noLanguage
        />
      </div>

      {/* {showInfo ? (
        <div className={styles.boundParent}>
          <Draggable handle="span" bounds="parent">
            <div className={window.aboutContainer}>
              <span>
                <div className={window.aboutHeader}>
                  <p>{t.info}</p>
                </div>
              </span>
              <div
                onClick={() => setShowInfo(false)}
                className={window.aboutClose}
              ></div>
              <div className={window.aboutContent}>
                <BlockContent
                  blocks={router.locale === "cs" ? project.cs : project.en}
                  noLanguage
                />
              </div>
            </div>
          </Draggable>
        </div>
      ) : (
        ""
      )} */}
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const paths = await client.fetch(`
    *[_type == "projects" && defined(slug.current)][].slug.current
  `);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { project, morePosts } = await client.fetch(
    `
    {  "project": *[_type == "projects" && slug.current == $slug] | order(_updatedAt desc) [0] {
        ...
      }}  
    `,
    { slug: params.slug }
  );

  return {
    props: { ...project },
    revalidate: 10, // In seconds
  };
}
