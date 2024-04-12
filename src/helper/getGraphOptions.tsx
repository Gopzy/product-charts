import { PIE_CHART } from "../constant/constant";
import getAxisValue from "../utils/getAxisValue";

const getGraphOptions = (products, chartType) => {
  const { xAxis, yAxis } = getAxisValue(products);

  const options = {
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    chart: {
      type: chartType,
    },
    title: {
      text: "Products in selected Category",
    },

    xAxis: {
      categories: xAxis,
    },
    series: [
      {
        name: "Price",
        colorByPoint: chartType === PIE_CHART && true,
        data: yAxis,
      },
    ],
  };

  return options;
};

export default getGraphOptions;
