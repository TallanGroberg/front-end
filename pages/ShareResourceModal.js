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
      <Form style={{ backgroundColor: '#203749', overFlowY: 'auto' }}>
        <Field
          hasValidationStyling={false}
          type="input"
          placeholder="Name of resource"
          name="name-of-resource"
          label="Name of resource"
          component={Input}
        />
        <Field
          hasValidationStyling={false}
          type="url"
          placeholder="Resource url"
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
          placeholder="Programing Languages"
          label="By Category"
          name="category"
          options={allLanguages}
          component={Select}
        />

        <div className="radio-buttons" style={{ display: 'inline-flex', margin: 5 }}>
          <p style={{ color: 'white' }}>Free resource*</p>
          <p style={{ color: 'white' }}>yes</p>
          <Field
            hasValidationStyling={false}
            type="radio"
            name="free"
            label="free"
            component={Input}
          />
          <p style={{ color: 'white' }}>no</p>
          <Field
            hasValidationStyling={false}
            type="radio"
            name="paid"
            label="paid"
            component={Input}
          />
        </div>
        <Field
          hasValidationStyling={false}
          type="textarea"
          name="paid"
          label="paid"
          component={Input}
        />
        {errorMessage !== null ? <p style={{ color: 'red' }}>{errorMessage}</p> : null}
      </Form>
    </Formik>
  );
};

export default ShareResourceModal;
