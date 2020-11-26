import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import MakeAsyncFunction from 'react-redux-promise-listener';
import {promiseListener} from '../store';
import styled from 'styled-components';

import OnBoardingWizard from './onboarding-wizard';
import {EnterValueForm} from './EnterValueForm';
import {VerifyEntryForm} from './VerifyEntryForm';
import { NestedEmailForm } from './EmailForm';

import {ONBOARDING_REQUEST, ONBOARDING_SUCCESS, ONBOARDING_FAILURE} from '../modules/onBoarding/onBoardingRedux';

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

const resolveErrors = asyncFn => (...args) => {
  asyncFn(...args).then(success => success, error => {console.log('error: ', error); return Promise.resolve(error);})
}

class WizardForm extends Component {
  render() {
    const {isLoading} = this.props;
    
    return (
      <MakeAsyncFunction
        listener={promiseListener}
        start={ONBOARDING_REQUEST}
        resolve={ONBOARDING_SUCCESS}
        reject={ONBOARDING_FAILURE}
      >
        {onSubmit => (
          <CenteredContainer>
            <OnBoardingWizard
              isLoading={isLoading}
              onSubmit={onSubmit}
            >
              <OnBoardingWizard.Page>
                <NestedEmailForm />
              </OnBoardingWizard.Page>
            </OnBoardingWizard>
          </CenteredContainer>
        )}
      </MakeAsyncFunction>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.onBoarding.isLoading,
  }
}

export default withRouter(connect(mapStateToProps, {})(WizardForm))
