import type { CSSProperties } from "vue";

/**
 * Resolve urls from frontmatter and append with the base url
 */
export function resolveAssetUrl(url: string) {
  if (url.startsWith("/")) return import.meta.env.BASE_URL + url.slice(1);
  return url;
}

export function handleBackground(
  background?: string,
  dim = false,
  backgroundSize = "cover",
): CSSProperties {
  const isString = typeof background === "string";
  const isColor =
    isString && (background[0] === "#" || background.startsWith("rgb"));

  const style: CSSProperties = {
    background: isColor ? background : undefined,
    color: isString && !isColor ? "white" : undefined,
    backgroundImage:
      isString && !isColor
        ? dim
          ? `linear-gradient(#0005, #0008), url(${background})`
          : `url("${background}")`
        : undefined,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize,
  };

  if (!style.background) delete style.background;

  return style;
}
