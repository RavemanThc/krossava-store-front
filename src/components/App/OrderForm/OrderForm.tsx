import { Field, Form, Formik } from "formik";
import css from "./OrderForm.module.css";
import { useId } from "react";
export default function OrderForm() {
  const fieldId = useId();
  return (
    <Formik
      initialValues={{ firstname: "", lastname: "", socialMedia: "" }}
      onSubmit={() => {}}
    >
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend>Данні отримувача</legend>
          <label htmlFor={`${fieldId}-firstname`} className={css.label}>
            Ім'я
          </label>
          <Field
            type="text"
            name="firstname"
            className={css.field}
            id={`${fieldId}-firstname`}
          />
          <label htmlFor={`${fieldId}-lastname`} className={css.label}>
            Прізвище
          </label>
          <Field
            type="text"
            name="lastname"
            className={css.field}
            id={`${fieldId}-lastname`}
          />
          <label htmlFor={`${fieldId}-socialMedia`} className={css.label}>
            Контактні данні
            <span className={css.socialMedia}>
              <span className={css.viber}>Viber</span>/
              <span className={css.telegram}>Telegram</span>/
              <span className={css.instagram}>instagram</span>
            </span>
          </label>
          <Field
            type="text"
            name="socialMedia"
            className={css.field}
            id={`${fieldId}-socialMedia`}
          />
        </fieldset>
        <p className={css.managerText}>
          наш менеджер зв'яжиться з вами для уточнення деталей замовлення
        </p>
        <button type="submit" className={css.submitButton}>
          Замовити
        </button>
      </Form>
    </Formik>
  );
}
