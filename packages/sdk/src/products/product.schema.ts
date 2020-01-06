import * as Yup from 'yup';

export const ProductsSchema = Yup.object().shape({
  name: Yup.string().required(),
});

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
});
