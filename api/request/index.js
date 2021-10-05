import Axios from 'axios';

export const ApiRequest = async (
  url,
  method,
  params,
  body = null,
  headers = {}
) => {
  try {
    const options = {
      url,
      headers,
      method,
      params: params || '',
      timeout: 30000,
    };

    if (body) {
      Object.assign(options, {
        data: body,
      });
    }

    const response = await Axios(options);
    return response;
  } catch (error) {
    throw error;
  }
};
