export const ContentType = {
  JSON: 'application/json',
  URL_ENCODED: 'application/x-www-form-urlencoded',
};

export const contentTypeUrlEncodedHeader = {
  headers: {
    'Content-Type': ContentType.URL_ENCODED,
  },
};
