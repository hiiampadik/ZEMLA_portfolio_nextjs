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

export default function Article(article) {
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const [gallery, setGallery] = useState(null);
  const { theme, setTheme } = useTheme();

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (theme === "highTech" && article?.galleryNormal != null) {
      setGallery(article.galleryNormal);
    } else if (theme == "lowTech" && article?.galleryLow != null) {
      setGallery(article.galleryLow);
    }
  }, [article, theme]);

  return (
    <Layout>

      {console.log(article)}

      <div className={styles.projectInfoContainer}>
        <BlockContent
          blocks={router.locale === "cs" ? article.cs : article.en}
          noLanguage
        />
      </div>

    </Layout>
  );
}

export async function getStaticPaths(context) {
  const paths = await client.fetch(`
    *[_type == "articles" && defined(slug.current)][].slug.current
  `);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { article } = await client.fetch(
    `
    {  "article": *[_type == "articles" && slug.current == $slug] | order(_updatedAt desc) [0] {
        ...
      }}  
    `,
    { slug: params.slug }
  );

  return {
    props: { ...article },
    revalidate: 10, // In seconds
  };
}
