import React from 'react';
import { Formik, Field, Form } from 'formik';
import style from './BrandsForm.module.scss';

const BrandsForm = () => (
  <div className={ style.brandsForm }>
    <h3>Бренд</h3>
    <Formik
      initialValues={ {
        picked: '',
      } }
      onSubmit={ ( values ) => {
        alert( values );
      } }
    >
      { () => (
        <Form>
          <div role="group" aria-labelledby="my-radio-group" className={ style.checkboxGroup }>
            <Field type="text" name="picked" value="" placeholder={ 'Название бренда' }/>
            <label>
              <Field type="checkbox" name="picked" value="AIRYVEST"/>
              AIRYVEST
            </label>
            <label>
              <Field type="checkbox" name="picked" value="BIOMILL"/>
              BIOMILL
            </label>
            <label>
              <Field type="checkbox" name="picked" value="CAMON"/>
              CAMON
            </label>
            <label>
              <Field type="checkbox" name="picked" value="CAT STEP"/>
              CAT STEP
            </label>
            <label>
              <Field type="checkbox" name="picked" value="DENNERLE"/>
              DENNERLE
            </label>
            <label>
              <Field type="checkbox" name="picked" value="ELATO"/>
              ELATO
            </label>
            <label>
              <Field type="checkbox" name="picked" value="FIBREFAMILY"/>
              FIBRE FAMILY
            </label>
            <label>
              <Field type="checkbox" name="picked" value="GIMDOG"/>
              GIMDOG
            </label>
            <label>
              <Field type="checkbox" name="picked" value="HAPPYFRIENDS"/>
              HAPPY FRIENDS
            </label>
          </div>
        </Form>
      ) }
    </Formik>
  </div>
);

export default BrandsForm;
