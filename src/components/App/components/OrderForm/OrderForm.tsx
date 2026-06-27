import { toast } from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./OrderForm.module.css";
import { useId } from "react";
import type { Sneaker } from "../../../../types/sneaker";
import * as Yup from "yup";

interface OrderFormValues {
  firstname: string;
  lastname: string;
  socialMedia: string;
  productTitle: string;
  productImage: string;
  productSize: string;
  productBarcode: string;
}
interface OrderFormProps {
  sneaker: Sneaker;
  selectedSize: string;
  onSubmitSuccess?: () => void;
}

export default function OrderForm({
  sneaker,
  selectedSize,
  onSubmitSuccess,
}: OrderFormProps) {
  const initialValues: OrderFormValues = {
    firstname: "",
    lastname: "",
    socialMedia: "",
    productTitle: sneaker.title,
    productImage: sneaker.images[0],
    productSize: selectedSize,
    productBarcode: sneaker.barcode,
  };
  const handleSubmit = async (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>,
  ) => {
    try {
      actions.setSubmitting(true);

      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Помилка сервера");
      }

      // 2. ЗАМЕНА ALERT НА КРАСИВЫЙ ТОСТ УСПЕХА
      toast.success("Дякуємо! Замовлення успішно надіслано.", {
        duration: 4000, // Показывается 4 секунды
        style: {
          background: "#333",
          color: "#fff",
        },
      });

      actions.resetForm();

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);

      // 3. ЗАМЕНА ALERT НА КРАСИВЫЙ ТОСТ ОШИБКИ
      toast.error("Сталася помилка при відправці. Спробуйте ще раз.", {
        duration: 5000,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };
  const fieldId = useId();
  const OrderFormSchema = Yup.object().shape({
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
      .max(30, "Максимум 30 символів")
      .required("Поле обов'язкове"),
    productTitle: Yup.string().required("Кросівки не додані"),
    productSize: Yup.string().required("Розмір не обраний"),
    productBarcode: Yup.string().required("Артикль не обраний"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={OrderFormSchema}
      enableReinitialize={true}
    >
      <Form className={css.form}>
        <div className={css.summary}>
          <img
            className={css.image}
            src={
              sneaker.images
                ? `${sneaker.images}`
                : "https://via.placeholder.com/500x750/ffffff/ffffff"
            }
            alt={sneaker.title}
            loading="lazy"
          />
          <p>
            Товар: <strong>{sneaker.title}</strong>
          </p>
          <p>
            Розмір: <strong>{selectedSize}</strong>
          </p>
        </div>
        <fieldset className={css.fieldset}>
          <legend>Дані отримувача</legend>
          <label htmlFor={`${fieldId}-firstname`} className={css.label}>
            Ім'я
          </label>
          <Field
            type="text"
            name="firstname"
            className={css.field}
            id={`${fieldId}-firstname`}
          />
          <ErrorMessage
            name="firstname"
            component="span"
            className={css.error}
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
          <ErrorMessage
            name="lastname"
            component="span"
            className={css.error}
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
          <ErrorMessage
            name="socialMedia"
            component="span"
            className={css.error}
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
