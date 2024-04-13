import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  CATEGORIES_API,
  COLUMN_CHART,
  PIE_CHART,
  PRODUCTS_API,
} from "../constant/constant";
import { catagories, chart, products } from "../types/type";

export const useChartData = () => {
  const [catagories, setCatagories] = useState<catagories>();
  const [selectedCategories, setSelectedCategories] = useState<string>();

  const [products, setProducts] = useState<products[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [runReport, setRunReport] = useState<boolean>(false);
  const [defaultChart, setDefaultChart] = useState<chart>(PIE_CHART);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: response } = await axios.get(CATEGORIES_API);
        setCatagories(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const {
        data: { products },
      } = await axios.get(PRODUCTS_API(selectedCategories));
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  }, [selectedCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const graphData = (chartType: chart) => {
    if (!selectedProducts.length && !selectedCategories && catagories)
      return catagories;
    if (selectedProducts.length && chartType !== PIE_CHART)
      return selectedProducts;
    else return products;
  };

  const handleCategorySelect = (selectedValue: string) => {
    setSelectedCategories(selectedValue);
    setSelectedProducts([]);
    setRunReport(true);
    setDefaultChart(PIE_CHART);
  };

  const handleProductSelect = (selectedValue: []) => {
    setSelectedProducts(selectedValue);
    setRunReport(true);
    setDefaultChart(PIE_CHART);
  };

  const clearFilter = () => {
    setSelectedCategories("");
    setSelectedProducts([]);
    setProducts([]);
    setRunReport(false);
    setDefaultChart(PIE_CHART);
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRunReport(false);
      setDefaultChart(COLUMN_CHART);
    }, 3000);
  };

  return {
    catagories,
    selectedCategories,
    products,
    selectedProducts,
    handleCategorySelect,
    handleProductSelect,
    clearFilter,
    runReport,
    handleClick,
    loading,
    setSelectedProducts,
    defaultChart,
    graphData,
  };
};
