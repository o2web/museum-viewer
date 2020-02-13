import gql from 'graphql-tag';
import client from './client';

const success = 'SUCCESS';
const fail = 'FAIL';

const asyncQuery = (
  type,
  query,
  params = {},
) => (dispatch, getState) => {
  const locale = { locale: getState().i18nState.lang };
  const promise = client.query({
    query: gql(query),
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    variables: { ...locale, ...params },
  })
    .then((response) => {
      const payload = response.data;
      const data = (payload && Object.keys(payload).length > 0) ? Object.values(payload)[0] : {};
      const errors = data.errors || [];
      const responseType = response.errors || errors.length > 0 ? fail : success;
      dispatch({ type: `${type}_${responseType}`, payload });
      return payload;
    })
    .catch((errors) => {
      dispatch({ type: `${type}_${fail}` });
      if (window) window.console.log(errors);
    });
  return promise;
};

export { asyncQuery };
export default asyncQuery;
