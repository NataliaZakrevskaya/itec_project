import React from 'react';
import { Formik, Field, Form } from 'formik';
import style from './ProductTypesForm.module.scss';

const ProductTypesForm = () => (
  <div className={style.productTypesForm}>
    <h3>Тип товара</h3>
    <Formik
      initialValues={{
        picked: '',
      }}
      onSubmit={ (values) => {
        alert(values);
      }}
    >
      {() => (
        <Form>
          <div role="group" aria-labelledby="my-radio-group" className={style.radioGroup}>
            <label>
              <Field type="radio" name="picked" value="Feed" />
              Корм (сухой, влажный)
            </label>
            <label>
              <Field type="radio" name="picked" value="Goodies" />
              Лакомства
            </label>
            <label>
              <Field type="radio" name="picked" value="Toy" />
              Игрушки
            </label>
            <label>
              <Field type="radio" name="picked" value="Filler" />
              Наполнитель
            </label>
            <label>
              <Field type="radio" name="picked" value="HygieneAndCare" />
              Гигиена и уход
            </label>
            <label>
              <Field type="radio" name="picked" value="VeterinaryDiet" />
              Ветеринарная диета
            </label>
            <label>
              <Field type="radio" name="picked" value="Vitamins" />
              Амуниция, витамины
            </label>
            <label>
              <Field type="radio" name="picked" value="Bowl" />
              Миски
            </label>
            <label>
              <Field type="radio" name="picked" value="Toilets" />
              Туалеты
            </label>
            <label>
              <Field type="radio" name="picked" value="Houses" />
              Домики
            </label>
            <label>
              <Field type="radio" name="picked" value="Claws" />
              Когтеточки
            </label>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default ProductTypesForm;
