import { merge } from 'lodash';
import { DEV, LOCAL, PRODUCTION, TEST } from 'constants/runLevel';
import { ContentType } from 'constants/contentType';

export const API_URL = {
  [PRODUCTION]: `https://api.slasnextgen.com/`,
  [TEST]: `https://apitest.slasnextgen.com/`,
  [DEV]: `https://apidev.slasnextgen.com/`,
  [LOCAL]: `http://localhost:8080/`,
};

export const getBackendForRunLevel = runLevel => API_URL[runLevel];

const getDefaultOptions = () => ({
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${
      window.getSessionToken() ? window.getSessionToken() : ''
    }`,
    'Content-Type': ContentType.JSON,
    Accept: 'application/json',
  },
});

export const withOptions = (options = {}) =>
  merge({}, getDefaultOptions(), options);

export const putWithBody = (body, options = {}) =>
  merge(
    {},
    getDefaultOptions(),
    options,
    { method: 'PUT' },
    { body: JSON.stringify(body) },
  );

export const deleteWithoutBody = (options = {}) =>
  merge({}, getDefaultOptions(), options, { method: 'DELETE' });

export const postWithBody = (body, options = {}) =>
  merge(
    {},
    getDefaultOptions(),
    options,
    { method: 'POST' },
    { body: JSON.stringify(body) },
  );

export const postWithoutBody = (options = {}) =>
  merge({}, getDefaultOptions(), options, { method: 'POST' });

export async function deserializeJsonAsync(response) {
  return response.json();
}

export async function downloadBlob(download) {
  return download.blob();
}

export async function throwErrorsAsync(response) {
  if (response.ok) return;
  let message = 'Error message not specified in response object.';
  try {
    ({ message } = await deserializeJsonAsync(response));
  } catch {
    message = `HTTP ${response.status} Error: ${
      response.statusText
    }. No further details provided.`;
  }

  throw new Error(message || 'An unspecified error occurred.');
}
