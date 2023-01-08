export const toSlug = (genre: string) => genre.replace("/", "-").toLowerCase();

const capitalizeWords = (sentence: string, separator: string) => {
  return sentence
    .split(separator)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(separator);
};

export const fromSlug = (slug: string) => {
  const replaced = slug.replace("-", "/");
  const separators = [" ", "/", "&"];

  return separators.reduce((acc, separator) => {
    return capitalizeWords(acc, separator);
  }, replaced);
};
