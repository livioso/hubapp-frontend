let host = ''; // eslint-disable-line immutable/no-let

// Make sure that we never accidentally use
// localhost in production! If you want to
// use localhost change it only for non-production
if (process.env.NODE_ENV === 'production') {
  host = '_not_yet_done_';
} else {
  host = 'http://Tateyama.local:8080';
}

const apiRoot = '/api';
const apiMembers = '/members';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint) => {
  return fetch(endpoint)
    .then(response => response.json()
    .then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' })
    );
};

// fetch all members unfiltered
export const apiFetchMemberList = () => {
  const endpoint = `${host}${apiRoot}${apiMembers}/`;
  const response = callApi(endpoint).then(json => json.response._embedded.members);
  return response;
};
