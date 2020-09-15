import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FinalForm } from './FinalForm';
import { AntForm } from './AntForm';
import { WarningForm } from './WarningForm';
import { SelectForm } from './SelectForm';
import { ListForm } from './ListForm';
import { ModalFormExample } from './ModalForm';
import {AntSelectFForm} from './AntSelectFForm';
import {TestForm} from './TestForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path={'/'} component={App} />
        <Route exact path={'/f-form'} component={FinalForm} />
        <Route exact path={'/a-form'} component={AntForm} />
        <Route exact path={'/w-form'} component={WarningForm} />
        <Route exact path={'/s-form'} component={SelectForm} />
        <Route exact path={'/l-form'} component={ListForm} />
        <Route exact path={'/m-form'} component={ModalFormExample} />
        <Route exact path={'/as-fform'} component={AntSelectFForm} />
        <Route exact path={'/test'} component={TestForm} />
        
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
