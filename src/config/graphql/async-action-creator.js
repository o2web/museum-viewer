import gql from 'graphql-tag';
import { stopSubmit } from 'redux-form';
import client from './client';
import actions from '../../app/actions/promises';

const success = 'SUCCESS';
const fail = 'FAIL';

export function asyncQuery(
  type,
  query,
  params = {},
) {
  return (dispatch, getState) => {
    dispatch({ type });
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

    dispatch(actions.addPromise(promise));

    return promise;
  };
}

export function asyncMutation(
  type,
  mutation,
  params = {},
) {
  return (dispatch, getState) => {
    dispatch({ type });

    const locale = { locale: getState().i18nState.lang };

    const promise = client.mutate({
      mutation: gql(mutation),
      fetchPolicy: 'no-cache',
      variables: { ...locale, ...params },
    })
      .then((response) => {
        const payload = response.data;
        const data = (payload && Object.keys(payload).length > 0) ? Object.values(payload)[0] : {};
        const errors = data.errors || [];
        const responseType = response.errors || errors.length > 0 ? fail : success;
        dispatch({ type: `${type}_${responseType}`, payload });

        if (data.errors instanceof Array && data.errors.length > 0) {
          const formErrors = data.errors.reduce(
            (obj, { field, message }) => ({ ...obj, [field]: message }), {},
          );

          dispatch(stopSubmit(Object.keys(payload)[0], formErrors));
        }

        return payload;
      })
      .catch((errors) => {
        dispatch({ type: `${type}_${fail}` });
        if (window) window.console.log(errors);
      });

    dispatch(actions.addPromise(promise));

    return promise;
  };
}
