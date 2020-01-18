import * as Yup from 'yup';
export declare const ProductsSchema: Yup.ArraySchema<Yup.Shape<object, {
    id: string;
    name: string;
}>>;
export declare const ProductSchema: Yup.ObjectSchema<Yup.Shape<object, {
    name: string;
}>>;
