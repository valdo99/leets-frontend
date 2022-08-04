const getQueryString = (params = {}) => {
  if (Object.keys(params).length === 0) return "";
  const queries = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    queries.push(`${key}=${value}`);
  }

  return "?" + queries.join("&");
};

export default getQueryString;
