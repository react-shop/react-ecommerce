import * as Yup from 'yup';

export const ProductsSchema = Yup.array().of(
  Yup.object().shape({
    id: Yup.string(),
    name: Yup.string(),
  })
);

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
});
