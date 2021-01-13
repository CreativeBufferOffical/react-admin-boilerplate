import React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

const KendoDatePicker = ({
  input: { onChange, onBlur, value, ...otherInputProps },
  meta: { error, touched },
  label,
  ...otherProps
}) => (
  <span className="k-form-field">
    <span>{label}</span>
    <DatePicker
      {...otherInputProps}
      {...otherProps}
      checked={value}
      value={value}
      onChange={event => {
        onChange(event.value || event.target.value);
      }}
      onBlur={event => onBlur(event.value)}
      format="MM/dd/yyyy"
      formatPlaceholder={{ year: 'YYYY', month: 'MM', day: 'DD' }}
    />
    {error && touched && <span className="k-required">{error}</span>}
  </span>
);

export default KendoDatePicker;
