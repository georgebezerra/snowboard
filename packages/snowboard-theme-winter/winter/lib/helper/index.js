import safeStringify from "safe-json-stringify";
import { filter as filterHelper } from "snowboard-theme-helper";
import { sendRequest } from "./request";
import highlight from "./highlight";
import markdown from "./markdown";
import colorize from "./colorize";
import seeds from "../../seeds";

const {
  config: { basePath }
} = seeds;

export function toHref(permalink) {
  const char = permalink.substr(0, 1);

  if (char == "/") {
    return permalink;
  }

  return permalink
    .replace(`${char}~`, `${basePath}${char}/`)
    .replace(/\/\//g, "/");
}

export function toPermalink(pathname) {
  const segment = pathname.replace(basePath, "");
  const char = segment.substr(0, 1);
  return pathname.replace(`${basePath}${char}/`, `${char}~`);
}

export function stringify(obj) {
  if (typeof obj === "string") {
    return obj;
  }

  if (obj) {
    return safeStringify(obj, null, 2);
  }

  return "";
}

export function isAuth(environment, name) {
  return environment.auth && environment.auth.name === name;
}

export function filter(query, groups) {
  return filterHelper(query, groups).map(item => {
    const { permalink, ...rest } = item;

    return {
      ...rest,
      href: toHref(permalink)
    };
  });
}

export { highlight, markdown, colorize, sendRequest };
