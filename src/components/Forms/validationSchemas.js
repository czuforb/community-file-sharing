import * as Yup from "yup";

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Kérjük adjon meg hosszabb jelszót!")
    .required("Jelszó megadása kötelező"),
  passwordcheck: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "A két jelszónak egyeznie kell"
  ),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, "Túl rövid email cím!")
    .max(50, "Túl hosszú email cím!")
    .required("Email cím megadása kötelező"),
  name: Yup.string()
    .min(2, "Túl rövid nevet adott meg!")
    .max(50, "Túl hossző nevet adott meg!")
    .required("Név megadása kötelező"),
  password: Yup.string()
    .min(2, "Kérjük adjon meg hosszabb jelszót!")
    .required("Jelszó megadása kötelező"),
  terms: Yup.boolean()
    .oneOf([true], "A feltételek elfogadása kötelező.")
    .required("A feltételek elfogadása kötelező."),
  passwordcheck: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "A két jelszónak egyeznie kell"
  ),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, "Túl rövid email cím!")
    .max(50, "Túl hosszú email cím!")
    .required("Email cím megadása kötelező"),
  password: Yup.string()
    .min(2, "Kérjük adjon meg hosszabb jelszót!")
    .required("Jelszó megadása kötelező"),
});

export const documentSchema = Yup.object().shape({
  documentTitle: Yup.string()
    .min(2, "Túl rövid címe adott meg!")
    .max(150, "Túl hosszú nevet adott meg!")
    .required("Cím megadása kötelező"),
  documentDescription: Yup.string()
    .min(20, "Kérem adjon meg hosszabb leírást!")
    .max(250, "Túl hosszú leírást adott meg!")
    .required("Leírás megadása kötelező"),
  documentCategory: Yup.string().required("Kategória megadása kötelező"),
  documentSubCategory: Yup.string().required("Alkategória megadása kötelező"),
});
export const annuncementSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Túl rövid címe adott meg!")
    .max(150, "Túl hosszú nevet adott meg!")
    .required("Cím megadása kötelező"),
  description: Yup.string()
    .min(20, "Kérem adjon meg hosszabb leírást!")
    .max(250, "Túl hosszú leírást adott meg!")
    .required("Leírás megadása kötelező"),
  contact: Yup.string()
    .email("Kérem adjon meg valódi emailt!")
    .required("Kapcsolat megadása kötelező"),
  owner: Yup.string()
    .min(5, "Kérem adjon meg hosszabb Nevet!")
    .max(250, "Túl hosszú nevet adott meg!")
    .required("Kapcsolattartó megadása kötelező"),
  organization: Yup.string()
    .min(5, "Kérem adja meg a szervezetének pontos nevét")
    .max(250, "Túl hosszú nevet adott meg!")
    .required("Szervezet megadása kötelező"),
});
