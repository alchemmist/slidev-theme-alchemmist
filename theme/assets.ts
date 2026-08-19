import type { CSSProperties } from "vue";

export function resolveAssetUrl(url = ""): string {
  if (!url.startsWith("/")) return url;
  return `${import.meta.env.BASE_URL}${url.slice(1)}`;
}

export function backgroundStyle(
  source = "",
  options: {
    dim?: number | boolean;
    position?: string;
    size?: string;
  } = {},
): CSSProperties {
  if (!source) return {};

  if (
    source.startsWith("#") ||
    source.startsWith("rgb") ||
    source.startsWith("hsl")
  )
    return { background: source };

  const url = resolveAssetUrl(source).replaceAll('"', '\\"');
  const amount = options.dim === true ? 0.5 : Number(options.dim || 0);
  const overlay =
    amount > 0
      ? `linear-gradient(rgba(0, 0, 0, ${amount}), rgba(0, 0, 0, ${amount})), `
      : "";

  return {
    backgroundImage: `${overlay}url("${url}")`,
    backgroundPosition: options.position ?? "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: options.size ?? "cover",
  };
}
