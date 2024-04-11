const getAxisValue = (products) => {
  let obj = { xAxis: [], yAxis: [] };
  products.forEach(({ title, price }) => {
    obj.xAxis.push(title);
    obj.yAxis.push({ name: title, y: price });
  });

  return obj;
};

export default getAxisValue;
