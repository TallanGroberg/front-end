import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import Input from 'components/Form/Input/Input';
import Form from 'components/Form/Form';
import Select from 'components/Form/Select/Select';
import { getResourcesByCategories, getResourcesByLanguages } from 'common/constants/api';

const ShareResourceModal = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    Promise.all([getResourcesByCategories(), getResourcesByLanguages()])
      .then(([categoriesResponse, languagesResponse]) => {
        const {
          data: { categories: categoriesData },
        } = categoriesResponse;
        const {
          data: { languages: languagesData },
        } = languagesResponse;

        setAllLanguages(
          languagesData.map(languageObject => {
            return {
              value: languageObject.name.toLowerCase(),
              label: languageObject.name,
            };
          }),
        );
        setAllCategories(
          categoriesData.map(categoryObject => {
            return {
              value: categoryObject.name.toLowerCase(),
              label: categoryObject.name,
            };
          }),
        );
      })
      .catch(() => {
        setErrorMessage('There was a problem gathering those resources.');
      });
  }, []);

  return (
    <Formik>
      <Form>
        <Field
          hasValidationStyling={false}
          type="input"
          name="name-of-resource"
          label="Name of resource"
          component={Input}
        />
        <Field
          hasValidationStyling={false}
          type="url"
          name="resource-url"
          label="resource url"
          component={Input}
        />
        <Field
          hasValidationStyling={false}
          type="url"
          name="resource-url"
          label="resource url"
          component={Input}
        />
        <Field
          hasValidationStyling={false}
          placeholder="Start typing a category..."
          label="By Category"
          name="category"
          options={allCategories}
          component={Select}
        />
        <Field
          hasValidationStyling={false}
          placeholder="Start typing a language..."
          label="By Language(s)"
          name="languages"
          options={allLanguages}
          component={Select}
        />

        <Field
          hasValidationStyling={false}
          type="radio"
          name="free"
          label="free"
          component={Input}
        />
        <Field
          hasValidationStyling={false}
          type="radio"
          name="paid"
          label="paid"
          component={Input}
        />
      </Form>
      {errorMessage !== null ? <p style={{ color: 'red' }}>{errorMessage}</p> : null}
    </Formik>
  );
};

export default ShareResourceModal;
