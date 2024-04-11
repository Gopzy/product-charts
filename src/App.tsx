import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Highcharts, { getOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import DropdownMenu from "./components/dropDown";
import ProductDropDownMenu from "./components/ProductDropDown";
import getGraphOptions from "./helper/helper";

function App() {
  //create custom hook only retrn need values eg: catagories, products, selectedProducts

  const [catagories, setCatagories] = useState();
  const [selectedCategories, setSelectedCategories] = useState();

  const [products, setProducts] = useState([]);
  // const [selectedProducts, setSelectedProducts] = useState([]);
  // const [selectedProductsPrice, setSelectedProductsPrice] = useState([]);

  // const [allProductsName, setAllProductsName] = useState<any>();
  // const [allProductsPrice, setAllProductsPrice] = useState<any>();

  const [buttonClicked, setButtonClicked] = useState<boolean>(true);

  const [allSelectedProducts, setAllSelectedProducts] = useState([]);

  console.log("allSelectedProducts :::", allSelectedProducts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://dummyjson.com/products/categories/"
        );
        setCatagories(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const fetchSelectedCatagories = useCallback(async () => {
    try {
      const {
        data: { products },
      } = await axios.get(
        `https://dummyjson.com/products/category/${selectedCategories}`
      );
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  }, [selectedCategories]);

  useEffect(() => {
    fetchSelectedCatagories();
  }, [fetchSelectedCatagories]);

  const handleCategorySelect = (selectedValue) => {
    setSelectedCategories(selectedValue);

    setAllSelectedProducts([]);

    setButtonClicked(false);
  };

  // const handleProductSelect = (selectedValue) => {
  //   !selectedProducts.includes(selectedValue) &&
  //     setSelectedProducts([...selectedProducts, selectedValue]);

  //   const selectedProductObject = products.filter(
  //     ({ title, price }) => title === selectedValue
  //   );

  //   setSelectedProductsPrice([
  //     ...selectedProductsPrice,
  //     selectedProductObject[0].price,
  //   ]);

  //   setButtonClicked(false);
  // };

  const handleProductSelect = (selectedValue) => {
    // setSelectedProducts([...selectedProducts, selectedValue]);

    const selectedProduct = products.filter(
      ({ title }) => title === selectedValue
    );
    console.log("selectedProduct :::", selectedProduct?.[0]);
    setAllSelectedProducts([...allSelectedProducts, selectedProduct?.[0]]);

    setButtonClicked(false);
  };

  const clearFilter = () => {
    setSelectedCategories(null);
    setAllSelectedProducts([]);
    setProducts([]);
  };

  const getProductLabels = () => {
    const removeProduct = (title) => {
      const newselectedProducts = allSelectedProducts.filter(
        (element) => element.title !== title
      );

      setAllSelectedProducts(newselectedProducts);
    };

    return (
      <>
        {allSelectedProducts?.map((element, index) => (
          <label key={index} onClick={() => removeProduct(element.title)}>
            {element.title} <br />
          </label>
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <h2>Select Category</h2>
      <DropdownMenu
        options={catagories}
        onSelect={handleCategorySelect}
        selectedCategories={selectedCategories}
      />

      <ProductDropDownMenu
        disabled={!selectedCategories}
        options={products}
        onSelect={handleProductSelect}
        selectedCategories={allSelectedProducts}
      />

      <button disabled={buttonClicked} onClick={() => setButtonClicked(true)}>
        Run Report
      </button>
      <button onClick={clearFilter}>Clear</button>
      <br />

      {getProductLabels()}
      <HighchartsReact
        highcharts={Highcharts}
        options={getGraphOptions(products, "pie")}
      />
      {selectedCategories && buttonClicked ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={getGraphOptions(
            allSelectedProducts.length ? allSelectedProducts : products,
            "column"
          )}
        />
      ) : null}
    </div>
  );
}

export default App;
