import styles from "../styles/Films.module.scss";
import Layout from "../components/Layout";

import Link from "next/link";

import client from "../client";
import { useEffect, useState } from "react";


export default function Projects(props) {

  return (
    <Layout>
      <div>
        {props.articles?.map((article, i) => {
          const slug = article._id ? article.slug?.current : "";
          return (
            <Link
              key={article._id}
              href="/articles/[slug]"
              as={`/articles/${slug}`}
            >
              <a
                className={styles.filmButtonContainer}
              >
                <h1>{article.title}</h1>
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const articles = await client.fetch(
    `
          *[_type == 'articles']
        `,
    ""
  );
  return {
    props: {
      articles,
    },
    revalidate: 10,
  };
}
