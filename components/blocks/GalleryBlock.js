import styles from './GalleryBlock.module.scss'
import Figure from '../Figure'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar } from "swiper";
import { useRef, useState, useEffect } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";




export default function GalleryBlock(props) {

  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)


  return (

      <Swiper
        pagination={{
          type: "fraction",
        }}
        loop={true}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Pagination, Navigation, Scrollbar]}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        className={styles.swiper}
      >
        {props.images?.map((el, index) => {
          return (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <Figure image={el.asset} />
            </SwiperSlide>
          )
        })}
          <>
            <button className={styles.swiperButtonPrevWide} ref={navigationPrevRef}></button>
            <button className={styles.swiperButtonNextWide} ref={navigationNextRef}></button>
          </>
      </Swiper>
  )
}

