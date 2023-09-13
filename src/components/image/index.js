import NextImage from "next/image";

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#D66B29" offset="20%" />
      <stop stop-color="#AF692B" offset="50%" />
      <stop stop-color="#D66B29" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = str =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
export default function Image(props) {
  const { width, height, placeholder = "blur" } = props;
  return (
    <NextImage
      // placeholder={placeholder}
      // blurDataURL={`data:image/svg+xml;base64,${toBase64(
      //   shimmer(width, height)
      // )}`}
      width={width}
      priority={true}
      // quality={100}
      height={height}
      {...props}
    />
  );
}
