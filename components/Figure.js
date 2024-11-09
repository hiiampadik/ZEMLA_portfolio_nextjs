import imageUrlBuilder from "@sanity/image-url";
import client from "../client";
import { useTheme } from "next-themes";
import {useState} from 'react'
import styles from '../styles/Blocks.module.scss'

const builder = imageUrlBuilder(client);

export default function Figure({
  sizes = '50vmin',
  ...props
}) {
  const { theme } = useTheme();

  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    props.handleLoaded?.()
    setLoaded(true);
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <>
      {theme !== 'system' || (theme === 'system' && props.alwaysShow === true ) ?
        <>
          {theme === "lowTech"  ? (
            <img
              className={props.class != null ? props.class : "" }
              src={builder.image(props.image).auto("format").format('png').width(600).url()}
              alt={props.alt}
              onLoad={handleLoad}
            />
          ) : (
            <img
              className={loaded ? styles.loaded : styles.notLoaded}
              src={builder.image(props.image).auto("format").format('jpg').url()}
              alt={props.alt}
              sizes={sizes}
              onLoad={handleLoad}
              style={{ display: loaded ? 'block' : 'none' }}
              srcSet={`
                      ${builder
                        .image(props.image)
                        .auto("format")
                        .width(480)
                        .url()} 480w,
                      ${builder
                        .image(props.image)
                        .auto("format")
                        .width(800)
                        .url()} 800w,
                      ${builder
                        .image(props.image)
                        .auto("format")
                        .width(1300)
                        .url()} 1300w,
                      ${builder
                        .image(props.image)
                        .auto("format")
                        .width(1600)
                        .url()} 1600w,
                      ${builder
                        .image(props.image)
                        .auto("format")
                        .width(2000)
                        .url()} 2000w,
                    `}
            />
          )}
        </>
        :
        ""
      }
    </>
  );
}
