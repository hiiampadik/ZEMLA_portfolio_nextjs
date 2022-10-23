import imageUrlBuilder from "@sanity/image-url";
import client from "../client";
import Image from "next/image";

const builder = imageUrlBuilder(client);

export default function Figure(props) {
  const getWidth = () => {
    return 100;
    if (props.width === null) {
      const width = props.image.asset.metadata?.dimensions.width;
      const height = props.image.asset.metadata?.dimensions.height;
      if (width > height) {
        return 500;
      } else {
        return (500 / height) * width;
      }
    } else {
    }
  };

  const getHeight = () => {
    // return props.image.asset.metadata?.dimensions.height;
    // if (typeof props.height !== "undefined" && props.height !== null) {
    //   return props.height;
    // } else {
    //   if (typeof props.image.metadata?.dimensions.aspectRatio !== "undefined") {
    //     return 600 / props.image.metadata.dimensions.aspectRatio;
    //   } else {
    //     return (600 / 16) * 9;
    //   }
    // }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={props.class != null ? props.class : ""}
      // width={getWidth()}
      // height={getHeight()}
      src={builder.image(props.image).auto("format").url()}
      alt={props.alt}
      sizes="70vmin"
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
  );
}
