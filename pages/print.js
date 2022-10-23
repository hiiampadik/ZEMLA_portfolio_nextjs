import styles from "../styles/Commerce.module.scss";
import Layout from "../components/Layout";
import Figure from "../components/Figure";

import client from "../client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Print(commerce) {
  const { theme, setTheme } = useTheme();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    if (theme == "highTech" && commerce?.galleryNormal != null) {
      setGallery(commerce.galleryNormal);
    } else if (theme == "lowTech" && commerce?.galleryLow != null) {
      setGallery(commerce.galleryLow);
    }
  }, [commerce, theme]);

  return (
    <Layout>
      {gallery?.map((image, i) => {
        return <Figure image={image} alt={""} />;
      })}
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
