/*
move it in to helper function that returns the option, have another child function
inside that returns X, Y axis values (name and price) then assing it to option
*/

import getAxisValue from "./getXYaxisValue";

const getGraphOptions = (
  products,
  //  xAxisData,
  //   yAxiesData,
  chartType
) => {
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
      text: "My Products chart",
    },

    xAxis: {
      categories: getAxisValue(products).x,
      // categories: xAxisData,
    },
    series: [
      {
        name: "Price",
        colorByPoint: chartType === "pie" && true,
        data: getAxisValue(products).y,
      },
    ],
  };

  return options;
};

export default getGraphOptions;
