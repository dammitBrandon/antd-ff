import React, { Component } from 'react';
import { Form as FForm } from 'react-final-form';
import { Form, Button } from 'antd';
import { withRouter } from 'react-router-dom';

class OnBoardingWizard extends Component {
  static Page = ({children}) => children;
  
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {}
    };
    
    this.props.history.push(`/on-boarding/${this.state.page}`);
  }
  
  next = values => {
    this.props.history.push(`/on-boarding/${this.state.page + 1}`);
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
  };
  
  previous = () => {
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));
    this.props.history.push(`/on-boarding/${this.state.page - 1}`);
  };
  
  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[this.state.page];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  }
  
  handleSubmit = values => {
    const {children, onSubmit} = this.props;
    const {page} = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
    }
  };
  
  render() {
    const {children, isLoading} = this.props;
    const {
      page,
      // values
    } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    
    return (
      <FForm
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({
            submitError,
            handleSubmit,
            submitting,
            values
          }) => {
          return (
            <Form onFinish={handleSubmit}>
              {isLoading && <div>Loading...</div>}
              {<div className="error">{submitError}</div>}
              {activePage}
              
              <div className="buttons">
                {page > 0 && (
                  <Button
                    onClick={this.previous}
                  >
                    Back Button
                  </Button>
                )}
                {!isLastPage && (
                  <Button
                    type="submit"
                    htmlType="submit"
                  >
                    Next
                  </Button>
                )}
                {isLastPage && (
                  <Button
                    htmlType="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                )}
              </div>
              {/*<pre>Values: {JSON.stringify(values, 0, 2)}</pre>*/}
            </Form>
          );
        }}
      </FForm>
    )
    
  }
}

export default withRouter(OnBoardingWizard);
