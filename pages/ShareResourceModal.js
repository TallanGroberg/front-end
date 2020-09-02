import { Field, Formik } from 'formik';
import Input from 'components/Form/Input/Input';

const ShareResourceModal = () => {
  return (
    <Formik>
      <Field
        hasValidationStyling={false}
        type="input"
        name="name-of-resource"
        label="Name of resource"
        component={Input}
      />
    </Formik>
  );
};

export default ShareResourceModal;
