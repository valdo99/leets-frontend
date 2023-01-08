export const toSlug = (genre: string) => genre.replace("/", "-").toLowerCase();

const capitalizeWords = (sentence: string, separator: string) => {
  return sentence
    .split(separator)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(separator);
};

export const fromSlug = (slug: string) => {
  // return slugToName[slug];
  const replaced = slug.replace("-", "/");
  const separators = [" ", "/", "&"];

  return separators.reduce((acc, separator) => {
    return capitalizeWords(acc, separator);
  }, replaced);
};

// const slugToName: Record<string, string> = {
//   "dance-electronic": "Dance/Electronic",
//   "folk-acoustic": "Folk/Acoustic",
//   "r-b": "R&B",
//   "world-traditional": "World/Traditional",
//   blues: "blues",
//   classical: "classical",
//   country: "country",
//   "easy-listening": "easy listening",
//   "hip-hop": "hip hop",
//   jazz: "jazz",
//   latin: "latin",
//   metal: "metal",
//   "new-age": "new age",
//   pop: "pop",
//   rock: "rock",
// };
