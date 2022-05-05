import React from "react";

interface FormErrorProps {
  errorMsg: string;
}

const FormError: React.FC<FormErrorProps> = (props) => {
  return (
    <div className="form-error-txt" data-cy="form-error-txt">
      {props.errorMsg}
    </div>
  );
};

export default FormError;
