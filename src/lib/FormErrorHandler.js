// File for parsing and properly displaying all form validation errors

export const parseFormErrors = (errArray) => {
  // console.log('#parseFormErrors, errors: ', errArray);
  
  // parse errors object and make sure that the paths are either 'body' or simply the field name
  // to ensure that we only work with UI form errors
  
  // with the errors object that gets sent to this function, we pass over all the keys in this object
  // and make sure that there are no key with the pattern of ["body,firstName"] for example where
  // "body" is the path of the req.body, which is helpful but does not help us properly display the error
  // for the user to make any needed changes to form data.
  
  const errors = {};
  
  for (const errorField in errArray) {
    const _field =
      errorField.split(',')[0] === 'body'
        ? errorField.split(',')[1]
        : errorField;
    
    if (errors.hasOwnProperty(_field)) {
      errors[_field].concat(`, ${errArray[errorField]}`);
    } else {
      errors[_field] = errArray[errorField];
    }
  }
  
  return errors;
};
