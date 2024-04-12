export type products = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  category: catagories;
  rating: number;
  stock: number;
  thumbnail: string;
};

export type catagories = string[];

export type chart = "pie" | "column";
