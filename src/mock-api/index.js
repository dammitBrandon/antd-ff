import mockQuestionSets from './mock-question-sets';
import mockUsers from './mock-users';

const questionSets = [...mockQuestionSets];
const users = [...mockUsers];

const fakeDatabase = {
  questionSets: questionSets,
  users: users
};

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

//  eslint-disable-next-line
const failDelay = (ms) => {
  return new Promise((resolve, reject) => setTimeout(() => {
    return reject(new Error('MockAPIError, fail'));
  }, ms));
};

export const fetchQuestionSets = async () => {
  console.log('MockAPI#fetchQuestionSets, start');

  return await delay(1000).then(() => {
    const data = {
      status: 'ok',
      statusCode: 200,
      data: fakeDatabase.questionSets
    };
    console.log('MockAPI#fetchQuestionSets, done');
    return data;
  });
};

export const signUpResponse = async ({ firstName, lastName, email, password }) => (
  await delay(500).then(() => {
    console.log('MockAPI#signUpResponse, fields: %s %s %s %s', firstName, lastName, email, password);
    return {
      status: 'created',
      statusCode: 201,
      data: {
        token: fakeDatabase.users[0].token,
        user: fakeDatabase.users[0].user
      }
    };
  })
);

export const signInResponse = async ({ email, password }) => (
  await delay(500).then(() => {
    console.log('MockAPI#signInResponse, fields: %s %s ', email, password);
    let response;
    if (email === 'bailey1.brandon@gmail.edu') {
      console.log('no bailey1.brandon@gmail.edu found');
      response = {
        status: 'failed login',
        statusCode: 404
      };
    } else {
      console.log('login successful');
      response = {
        status: 'ok',
        statusCode: 200,
        data: {
          token: fakeDatabase.users[0].token,
          user: fakeDatabase.users[0].user
        }
      };
    }

    return response;
  })
);

export const okResponse = () =>
  delay(100)
    .then((args) => {
      console.log('MockAPI#okResponse, done, args: ', args);
      return {
        status: 'Unprocessable Entity',
        statusCode: 422,
        message: 'Form Errors'
      };
    });

// .catch((err) => {
//   console.error('MockAPI#okResponse, err: ', err);
//   return {
//     status: 'Unprocessable Entity',
//     statusCode: 422,
//     error: err
//   };
// });

export const createdResponse = () =>
  delay(500).then(() => {
    console.log('MockAPI#createdResponse, done');
    return {
      status: 'created',
      statusCode: 2001
    };
  });

export const verifyResendEmailResponse = () => (
  delay(600).then(() => {
    console.log('MockAPI#verifyResendEmailResponse');
    return {
      status: 'ok',
      statusCode: 200
    };
  })
  //   .catch((err) => {
  //   console.error('MockAPI#verifyResendEmailResponse, err: ', err);
  //   return {
  //     status: 'Unprocessable Entity',
  //     statusCode: 422,
  //     error: err
  //   };
  // })
);
