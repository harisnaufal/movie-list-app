import { ApiRequest } from '../../api';

export const apiRequestMiddleware = (store) => (next) => async (action) => {
  const {
    type,
    method,
    url,
    body,
    params,
    onSuccess,
    onFail,
    additionalHeaders,
  } = action;
  if (type === 'API_REQUEST') {
    try {
      let headers = {};
      if (additionalHeaders) {
        Object.assign(headers, { ...additionalHeaders });
      } else {
        Object.assign(headers, {
          'Content-Type': 'application/json',
        });
      }

      const response = await ApiRequest(url, method, params, body, headers);
      onSuccess(response);
    } catch (error) {
      onFail(error);
    }
  }
  return next(action);
};
