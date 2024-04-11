const getAxisValue = (products) => {
  //   console.log("getAxisValue :::", products);

  let obj = { x: [], y: [] };
  products.map(({ title, price }) => {
    obj.x.push(title);
    obj.y.push(price);
  });

  return obj;
};

export default getAxisValue;
