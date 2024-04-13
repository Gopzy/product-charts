import { catagories, products } from "../types/type";

const getAxisValue = (products: products[] | catagories) => {
  let obj = { xAxis: [], yAxis: [] };
  products.forEach((el) => {
    const objectType = typeof el === "object";

    obj.xAxis.push(objectType ? el.title : el);
    obj.yAxis.push(
      objectType ? { name: el.title, y: el.price } : { name: el, y: 10 }
    );
  });
  return obj;
};

export default getAxisValue;
