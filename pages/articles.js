import styles from "../styles/Article.module.scss";
import Layout from "../components/Layout";

import * as dayjs from "dayjs";

import Link from "next/link";

import client from "../client";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import Figure from "../components/Figure";

export default function Projects(props) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const getDate = (article) => {
    const date = new Date(article._createdAt);
    if (router.locale == "cs") {
      return dayjs(date).format("DD. MM. YYYY");
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const getImage = (images) => {
    if (theme == "highTech" && images?.high != null) {
      return (images.high)
    } else if (theme == "lowTech" && images?.low != null) {
      return (images.low)
    }
  }


  return (
    <Layout>
      <div className={styles.articlesContainer}>
        {console.log(props.articles)}
        {props.articles?.map((article, i) => {
          const slug = article._id ? article.slug?.current : "";
          return (
            <Link
              key={article._id}
              href="/articles/[slug]"
              as={`/articles/${slug}`}
            >
              <a className={styles.articlesListArticle}>
                <h1>
                  {router.locale === "cs"
                    ? article.title?.cs
                    : article.title?.en}
                </h1>
                <p>{getDate(article)}</p>
                <div className={styles.articlesListArticleFigure}>
                  <Figure image={getImage(article.images)} alt={""} />
                </div>
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
