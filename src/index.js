import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SetPhoneNumberForm } from './SetPhoneNumberForm';
import { SelectPlanForm } from './SelectPlanForm';
import { FinalForm } from './FinalForm';
import { AntForm } from './AntForm';
import { WarningForm } from './WarningForm';
import { SelectForm } from './SelectForm';
import { AntFileUploadForm } from './AntFileUpload';
import { ListForm } from './ListForm';
import { ModalFormExample } from './ModalForm';
import {AntSelectFForm} from './AntSelectFForm';
import {TestForm} from './TestForm';
import {TeacherDashboardScreen} from './TeacherDashboardScreen';
import {CreateQuestionSetScreen} from './create-question-set/CreateQuestionSetScreen';
import QuestionSetScreen from './question-sets/QuestionSetScreen';
import EditQuestionSetScreen from './edit-question-set/EditQuestionSetScreen';
import WizardForm from './nested-wizard-form';
import EditTutorGroupScreen from './triple-drawer-form/EditTutorGroupScreen';

import store from './store';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={'/'} component={App} />
          <Route exact path={'/f-form'} component={FinalForm} />
          <Route exact path={'/a-form'} component={AntForm} />
          <Route exact path={'/set-phone-number-fform'} component={SetPhoneNumberForm} />
          <Route exact path={'/select-plan-fform'} component={SelectPlanForm} />
          <Route exact path={'/w-form'} component={WarningForm} />
          <Route exact path={'/s-form'} component={SelectForm} />
          <Route exact path={'/l-form'} component={ListForm} />
          <Route exact path={'/m-form'} component={ModalFormExample} />
          <Route exact path={'/as-fform'} component={AntSelectFForm} />
          <Route exact path={'/file-upload-fform'} component={AntFileUploadForm} />
          <Route exact path={'/test'} component={TestForm} />
          <Route exact path={'/dashboard'} component={TeacherDashboardScreen} />
          <Route exact path={'/create-question-set'} component={CreateQuestionSetScreen} />
          <Route exact path={'/edit-question-set/:questionSetId'} component={EditQuestionSetScreen} />
          <Route exact path={'/question-sets'} component={QuestionSetScreen} />
          <Route exact path={'/edit-tutor-group'} component={EditTutorGroupScreen} />
          <Route path='/on-boarding/:step'
                 render={() => (
                   <WizardForm />
                 )}
          />
          
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
