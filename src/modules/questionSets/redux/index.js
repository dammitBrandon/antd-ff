import { all, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import request from '../../../lib/request';
import { FORM_ERROR } from 'final-form';
import { parseFormErrors } from '../../../lib/FormErrorHandler';
import {normalizedQuestionSetData} from '../selectors';

// Get Question Set by Id
export const QUESTION_SET_REQUEST = 'teacher/question-set/QUESTION_SET_REQUEST';
export const QUESTION_SET_SUCCESS = 'teacher/question-set/QUESTION_SET_SUCCESS';
export const QUESTION_SET_FAILURE = 'teacher/question-set/QUESTION_SET_FAILURE';

// Create New Question Set
export const CREATE_QUESTION_SET_REQUEST = 'teacher/question-set/CREATE_QUESTION_SET_REQUEST';
export const CREATE_QUESTION_SET_SUCCESS = 'teacher/question-set/CREATE_QUESTION_SET_SUCCESS';
export const CREATE_QUESTION_SET_FAILURE = 'teacher/question-set/CREATE_QUESTION_SET_FAILURE';

// Edit Question Set
export const EDIT_QUESTION_SET_REQUEST = 'teacher/question-set/EDIT_QUESTION_SET_REQUEST';
export const EDIT_QUESTION_SET_SUCCESS = 'teacher/question-set/EDIT_QUESTION_SET_SUCCESS';
export const EDIT_QUESTION_SET_FAILURE = 'teacher/question-set/EDIT_QUESTION_SET_FAILURE';

// Question Set Dashboard
export const QUESTION_SET_DASHBOARD_REQUEST = 'teacher/question-set/QUESTION_SET_DASHBOARD_REQUEST';
export const QUESTION_SET_DASHBOARD_SUCCESS = 'teacher/question-set/QUESTION_SET_DASHBOARD_SUCCESS';
export const QUESTION_SET_DASHBOARD_FAILURE = 'teacher/question-set/QUESTION_SET_DASHBOARD_FAILURE';

// Get Question Set by Id
export const handleQuestionSetRequest = payload => ({
  type: QUESTION_SET_REQUEST,
  payload
});

export const handleQuestionSetSuccess = payload => ({
  type: QUESTION_SET_SUCCESS,
  payload
});

export const handleQuestionSetFailure = payload => ({
  type: QUESTION_SET_FAILURE,
  payload
});

// Create New Question Set
export const handleCreateQuestionSetRequest = payload => ({
  type: CREATE_QUESTION_SET_REQUEST,
  payload
});

export const handleCreateQuestionSetSuccess = payload => ({
  type: CREATE_QUESTION_SET_SUCCESS,
  payload
});

export const handleCreateQuestionSetFailure = payload => ({
  type: CREATE_QUESTION_SET_FAILURE,
  payload
});

// Edit Question Set
export const handleEditQuestionSetRequest = payload => ({
  type: EDIT_QUESTION_SET_REQUEST,
  payload
});

export const handleEditQuestionSetSuccess = payload => ({
  type: EDIT_QUESTION_SET_SUCCESS,
  payload
});

export const handleEditQuestionSetFailure = payload => ({
  type: EDIT_QUESTION_SET_FAILURE,
  payload
});

// Question Set Dashboard
export const handleQuestionSetsDashboardRequest = payload => ({
  type: QUESTION_SET_DASHBOARD_REQUEST,
  payload
});

export const handleQuestionSetsDashboardSuccess = payload => ({
  type: QUESTION_SET_DASHBOARD_SUCCESS,
  payload
});

export const handleQuestionSetsDashboardFailure = payload => ({
  type: QUESTION_SET_DASHBOARD_FAILURE,
  payload
});


export function * onHandleQuestionSetRequest ({payload}) {
  console.log('#onHandleQuestionSetRequest, payload: ', payload);
  
  try {
    console.log('#onHandleQuestionSetRequest, try block');
    const response = yield call(request.get, `/question-sets/${payload}`);
    console.log('#onHandleQuestionSetRequest, response: ', response);
    const { data  } = response;
  
    return yield all([
      put(handleQuestionSetSuccess(data[0]))
    ]);
  } catch (err) {
    console.error('Error, #onHandleQuestionSetRequest, err: ', err);
  }
}

export function * onHandleCreateQuestionSetRequest ({payload}) {
  console.log('#onHandleCreateQuestionSetRequest', payload);
  
  try {
    console.log('#onHandleCreateQuestionSetRequest, try block');
    const response = yield call(request.post, '/question-sets', { questionSet: payload });
    console.log('#onHandleCreateQuestionSetRequest, response: ', response);
  } catch (err) {
    console.error('Error, #onHandleCreateQuestionSetRequest, err: ', err);
  }
}

export function * onHandleEditQuestionSetRequest({ payload }) {
  console.log('onHandleEditQuestionSetRequest, payload: ', payload);
  
  let updatedQuestionSet = {
    title: payload.title,
    questions: payload.questions,
  };
  
  try {
    console.log('#onHandleEditQuestionSetRequest, try block');
    const response = yield call(request.put, `/question-sets/${payload.id}`, { questionSet: updatedQuestionSet });
    console.log('#onHandleEditQuestionSetRequest, response: ', response);
  } catch (err) {
    console.error('Error, #onHandleEditQuestionSetRequest, err: ', err);
  }
}

export function * onHandleQuestionSetsDashboardRequest () {
  console.log('#onHandleQuestionSetsDashboardRequest');
  
  try {
    console.log('#onHandleQuestionSetsDashboardRequest, try block');
    const response = yield call(request.get, '/question-sets');
    console.log('#onHandleQuestionSetsDashboardRequest, response: ', response);
    const { data  } = response;
    console.log('#onHandleQuestionSetsDashboardRequest, questionSets: ', data);
    const normalizedData = normalizedQuestionSetData(data);
    console.log('#onHandleQuestionSetsDashboardRequest, normalizedData: ', normalizedData);
    
    return yield all([
      put(handleQuestionSetsDashboardSuccess(normalizedData))
      // put(handleQuestionSetsDashboardSuccess(data))
    ]);
  } catch (err) {
    console.error('Error, #onHandleQuestionSetsDashboardRequest, err: ', err);
  }
}

const INITIAL_STATE = {
  isLoading: false,
  data: [],
  error: null
};

export default function questionSets (state = INITIAL_STATE, action) {
  switch (action.type) {
    case QUESTION_SET_REQUEST:
    case QUESTION_SET_DASHBOARD_REQUEST:
      return { ...state, isLoading: true };
    case QUESTION_SET_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case QUESTION_SET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionSet: action.payload
      };
    case QUESTION_SET_DASHBOARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      console.log('default case, action: ', action);
      return state;
  }
}
