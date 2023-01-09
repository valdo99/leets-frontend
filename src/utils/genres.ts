const genreMapping: Record<string, string> = {
  "dance-electronic": "Dance/Electronic",
  "folk-acoustic": "Folk/Acoustic",
  "r&b": "R&B",
  "world-traditional": "World/Traditional",
  blues: "Blues",
  classical: "Classical",
  country: "Country",
  "easy-listening": "Easy Listening",
  "hip-hop": "Hip Hop",
  jazz: "Jazz",
  latin: "Latin",
  metal: "Metal",
  "new-age": "New Age",
  pop: "Pop",
  rock: "Rock",
};

export const slugToName = (genre: string) => {
  return genreMapping[genre];
};
