export const host = 'http://Raffi.local:8080';
export const membersURL = `${host}/api/members`;
export const currentMeURL = `${host}/api/members/me/skills`;
export const skillsURL = `${host}/api/skills`;
export const similarURL = `${host}/api/similar`;

/**
 * Parses the JSON returned
 * @param response response from a network request
 */
const parseJSON = (response) => {
  return response.json();
};

/**
 * Checks if a network request went OK
 * @param response response from a network request
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response; // all good
  }

  // something went wrong
  throw new Error(response.statusText);
};

/**
 * Request (GET) an URL, returns a promise
 * @param url the URL we are requesting
 * @param options passed to fetch
 */
export const request = (url, options) => {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
};
