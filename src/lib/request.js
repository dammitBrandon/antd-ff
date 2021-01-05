import axios from 'axios';
import qs from 'qs';

import * as mockAPI from '../mock-api';

const API_URL = 'http://localhost:3001/api/v1';

export default {
  del: (url, data, origin) => makeRequest(url, 'delete', data, origin),
  get: (url, data, origin) => mockRequest(url, 'get', data, origin),
  post: (url, data, origin) => makeRequest(url, 'post', data, origin),
  put: (url, data, origin) => makeRequest(url, 'put', data, origin),
};

const makeRequest = async (url, method, requestData, origin) => {
  // Remove leading slash if it's present
  if (url.startsWith('/')) {
    url = url.substr(1);
  }
  
  let apiUrl = `${origin || API_URL}/${url}`;
  let config = {
    method,
    url: apiUrl,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    },
  };
  
  if (requestData) {
    config = {
      ...config,
      data: requestData
    }
  }
  
  const req = await axios(config);
  return req;
};

// eslint-disable-next-line
const mockRequest = async (url, method, requestData, origin) => {
  console.log('#mockRequest');
  if (url.startsWith('/')) {
    url = url.substr(1);
  }
  
  let config = {
    method,
    url: url,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    }
  };
  
  if (requestData) {
    config = {
      ...config,
      data: requestData
    };
  }
  
  try {
    let questionSetId;
    if ((/question-sets\/(.*)/g).test(url)) {
      questionSetId = url.split('/')[1];
      console.log('questionSetId: ', questionSetId);
      url = 'question-sets/update';
    }
    switch (url) {
      case 'auth/login':
        return await mockAPI.signInResponse({ email: config.email, password: config.password });
      case 'accounts/create':
        return await mockAPI.signUpResponse({
          firstName: config.data.firstName,
          lastName: config.data.lastName,
          orgName: config.data.orgName,
          email: config.data.email,
          password: config.data.password
        });
      case 'verify/resend/email':
        return await mockAPI.verifyResendEmailResponse();
      case 'teachers/on-boarding':
        return await mockAPI.okResponse();
      case 'question-sets':
        return await mockAPI.fetchQuestionSets();
      case 'question-sets/update':
        return await mockAPI.fetchQuestionSet(questionSetId);
      default:
        console.log('default case, url: ', url);
        return await mockAPI.okResponse();
    }
  } catch (err) {
    console.error('Error: Failed to make request, err: ', err);
    return err;
  }
};
