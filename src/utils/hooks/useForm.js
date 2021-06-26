import { useState } from 'react';

function useForm(formFields, validate, initialValues = {}) {
  const initFields = formFields.reduce((ac, f) => ({ ...ac, [f.item]: '' }), {});
  const [fields, setFields] = useState({ ...initFields, ...initialValues });
  const [validation, setValidation] = useState(initFields);

  const handleValidation = evt => {
    const { name, value } = evt.target;
    !!validate && setValidation(state => ({ ...state, [name]: validate(name, value, fields) }));
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFields(state => ({ ...state, [name]: value }));

    !!validate && !validate(name, value, fields) && handleValidation(evt);
  };

  const isSubmitDisabled = (arr = formFields) =>
    arr.some(f => !!validation?.[f?.item]?.length || !fields?.[f?.item]?.length);

  const resetFields = () => {
    setFields(initFields);
    setValidation(initFields);
  };

  return {
    fields,
    validation,
    handleChange,
    handleValidation,
    isSubmitDisabled,
    setValidation,
    resetFields,
    setFields,
  };
}

export default useForm;
