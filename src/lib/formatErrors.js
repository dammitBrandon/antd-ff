export const formatErrors = (errArray) => {
  let errors = {};
  errArray.map(err => {
    if (errors.hasOwnProperty(err.param)) {
      return errors[err.param].concat(` ${err.msg}`);
      // errors[err.param].push(err.msg);
    } else {
      return errors[err.param] = err.msg;
    }
  });
  
  return errors;
}
