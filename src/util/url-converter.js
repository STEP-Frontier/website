import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export function url(filename) {
  const { publicRuntimeConfig } = getConfig();

  return publicRuntimeConfig.basePath + filename
}