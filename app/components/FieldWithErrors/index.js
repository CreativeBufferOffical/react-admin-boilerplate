import React from 'react';

import { Input } from 'reactstrap';

const FieldWithErrors = ({
  input,
  type,
  meta: { touched, error, warning },
}) => (
  <React.Fragment>
    <Input invalid={touched && !!error} {...input} type={type} />
    {touched &&
      ((error && <span className="road-red">{error}</span>) ||
        (warning && <span className="saffron">{warning}</span>))}
  </React.Fragment>
);

export default FieldWithErrors;
