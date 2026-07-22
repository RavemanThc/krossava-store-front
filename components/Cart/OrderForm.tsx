"use client";

import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { useCart } from "@/src/store/cart";
import css from "./OrderForm.module.css";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";

interface OrderValues {
  firstname: string;
  lastname: string;
  socialMedia: string;
}

const OrderSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(30, "Максимум 30 символів")
    .required("Поле обов'язкове"),

  lastname: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(30, "Максимум 30 символів")
    .required("Поле обов'язкове"),

  socialMedia: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(50, "Максимум 50 символів")
    .required("Поле обов'язкове"),
});

export default function OrderForm() {
  const id = useId();

  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);
  const orderItems = items.map((item) => ({
    name: item.sneaker.name,
    barcode: item.sneaker.barcode,
    price: item.sneaker.price,
    size: item.size,
    quantity: item.quantity,
  }));

  return (
    <Formik<OrderValues>
      initialValues={{
        firstname: "",
        lastname: "",
        socialMedia: "",
      }}
      validationSchema={OrderSchema}
      onSubmit={async (values, actions) => {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            customer: values,
            items: orderItems,
          });

          toast.success("Замовлення успішно відправлено!");

          clearCart();
          actions.resetForm();
        } catch (error) {
          console.error(error);
          toast.error("Помилка відправки замовлення");
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <fieldset className={css.fieldset}>
            <legend>Дані отримувача</legend>

            <label className={css.inputname} htmlFor={`${id}-firstname`}>
              Ім&#39;я
            </label>

            <Field
              id={`${id}-firstname`}
              name="firstname"
              className={css.field}
              placeholder="Владислав"
            />

            <ErrorMessage
              name="firstname"
              component="span"
              className={css.error}
            />

            <label className={css.inputname} htmlFor={`${id}-lastname`}>
              Прізвище
            </label>

            <Field
              id={`${id}-lastname`}
              name="lastname"
              className={css.field}
              placeholder="Гаркуша"
            />

            <ErrorMessage
              name="lastname"
              component="span"
              className={css.error}
            />

            <label className={css.inputname} htmlFor={`${id}-social`}>
              Контактні дані: Instagram/Telegram/Viber
            </label>

            <Field
              id={`${id}-socialMedia`}
              name="socialMedia"
              className={css.field}
              placeholder="Kros_savaua"
            />
            <ErrorMessage
              name="socialMedia"
              component="span"
              className={css.error}
            />
          </fieldset>

          <p className={css.managerText}>
            Наш менеджер зв&#39;яжеться з вами для уточнення деталей замовлення.
          </p>

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className={css.submitButton}
          >
            {isSubmitting ? "Відправка..." : "Замовити"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
