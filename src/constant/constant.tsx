// api constants
export const CATEGORIES_API = "https://dummyjson.com/products/categories/";
export const PRODUCTS_API = (category: string) =>
  `https://dummyjson.com/products/category/${category}`;

// chart constants
export const PIE_CHART = "pie";
export const COLUMN_CHART = "column";
