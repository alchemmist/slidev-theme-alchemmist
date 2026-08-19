export { resolveAssetUrl } from "./theme/assets";

import { backgroundStyle } from "./theme/assets";

export function handleBackground(
  background?: string,
  dim = false,
  backgroundSize = "cover",
) {
  return backgroundStyle(background, { dim, size: backgroundSize });
}
