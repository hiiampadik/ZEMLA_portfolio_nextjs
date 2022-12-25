import Layout from "../components/Layout";
import styles from "../styles/Homepage.module.scss";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import client from "../client";
import Figure from "../components/Figure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Home(props) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    if (theme === "lowTech") {
      setGallery(props.contact.galleryLow);
    } else {
      setGallery(props.contact.galleryNormal);
    }
  }, [theme]);

  return (
    <Layout>

      <Swiper
        loop={true}
        className={styles.homeSwiper}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true, // enables slides to cross fade
        }}
        speed={300}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {gallery?.map((image) => {
          return (
            <SwiperSlide key={image._key} className={styles.swiperSlide}>
              <Figure image={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>


    </Layout>
  );
}

export async function getStaticProps(context) {
  const contact = await client.fetch(
    `
    *[_id == "frontPage"]  [0] {
      ...,
      "galleryNormal":galleryNormal[]{..., asset->{...}},
      "galleryLow":galleryLow[]{..., asset->{...}},
      }
    
    `,
    ""
  );

  return {
    props: {
      contact,
    },
    revalidate: 10,
  };
}
