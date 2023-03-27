import imageUrlBuilder from "@sanity/image-url";
import client from "../client";
import Image from "next/image";
import { useTheme } from "next-themes";

const builder = imageUrlBuilder(client);

export default function Figure({
  sizes = '50vmin',
  ...props
}) {
  const { theme, setTheme } = useTheme();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <>
      {theme !== 'system' || (theme === 'system' && props.alwaysShow === true ) ?
        <>
          {theme === "lowTech"  ? (
            <img
              className={props.class != null ? props.class : ""}
              src={builder.image(props.image).auto("format").format('png').width(600).url()}
              alt={props.alt}
            />
          ) : (
            <img
              className={props.class != null ? props.class : ""}
              src={builder.image(props.image).auto("format").format('jpg').url()}
              alt={props.alt}
              sizes={sizes}
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
