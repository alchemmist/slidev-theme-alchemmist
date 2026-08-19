export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface ThemeConfig {
  accent?: string;
  footer?: boolean;
  footerComponent?: string;
  footerLogo?: string;
  footerLogoAlt?: string;
  footerHideDate?: boolean;
  footerHideLogos?: boolean;
  footerPagesDisabled?: number[];
  pagination?: boolean;
  paginationPosition?: Corner;
  paginationPagesDisabled?: number[];
  paginationX?: "l" | "r";
  paginationY?: "t" | "b";
}

export interface SlideChromeFrontmatter {
  footer?: boolean;
  hideFooter?: boolean;
  hideDate?: boolean;
  hideLogos?: boolean;
  pagination?: boolean;
  hidePagination?: boolean;
}

export function resolveCorner(config: ThemeConfig): Corner {
  if (config.paginationPosition) return config.paginationPosition;

  const vertical = config.paginationY === "b" ? "bottom" : "top";
  const horizontal = config.paginationX === "l" ? "left" : "right";
  return `${vertical}-${horizontal}`;
}

export function isChromeVisible(
  kind: "footer" | "pagination",
  page: number,
  total: number,
  frontmatter: SlideChromeFrontmatter,
  config: ThemeConfig,
): boolean {
  if (page === total + 1) return false;

  const hiddenAlias =
    kind === "footer" ? frontmatter.hideFooter : frontmatter.hidePagination;
  if (frontmatter[kind] === false || hiddenAlias === true) return false;

  const disabledPages =
    kind === "footer"
      ? config.footerPagesDisabled
      : config.paginationPagesDisabled;
  if (disabledPages?.includes(page)) return false;

  return config[kind] !== false;
}
