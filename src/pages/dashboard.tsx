import { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import DropdownMenu from "../components/dropDown";
import getGraphOptions from "../helper/getGraphOptions";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import {
  CATEGORIES_API,
  COLUMN_CHART,
  PIE_CHART,
  PRODUCTS_API,
} from "../constant/constant";

const Dashboard = () => {
  //create custom hook only retrn need values eg: catagories, products, selectedProducts

  const [catagories, setCatagories] = useState();
  const [selectedCategories, setSelectedCategories] = useState();

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [runReport, setRunReport] = useState<boolean>(false);
  const [defaultChart, setDefaultChart] = useState(PIE_CHART);

  const [loading, setLoading] = useState(false);

  //   const productData = selectedProducts.length ? selectedProducts : products;

  const productData = (chartType) => {
    if (!selectedProducts.length && !selectedCategories && catagories)
      return catagories;
    if (selectedProducts.length && chartType !== PIE_CHART)
      return selectedProducts;
    else return products;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(CATEGORIES_API);
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
      } = await axios.get(PRODUCTS_API(selectedCategories));
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
    setSelectedProducts([]);
    setRunReport(true);
    setDefaultChart(PIE_CHART);
  };

  const handleProductSelect = (selectedValue) => {
    const selectedProduct = products.filter(
      ({ title }) => title === selectedValue
    );

    !selectedProducts.some(({ title }) => title === selectedValue) &&
      setSelectedProducts([...selectedProducts, selectedProduct?.[0]]);

    setRunReport(true);
    setDefaultChart(PIE_CHART);
  };

  const getProductLabels = () => {
    const removeProduct = (rmTitle) => {
      const newselectedProducts = selectedProducts.filter(
        ({ title }) => title !== rmTitle
      );
      setSelectedProducts(newselectedProducts);
    };
    return (
      <>
        {selectedProducts?.map(({ title }, index) => (
          <label key={index} onClick={() => removeProduct(title)}>
            {title}
          </label>
        ))}
      </>
    );
  };

  const clearFilter = () => {
    setSelectedCategories(null);
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

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <h2>Filters</h2>
            <Button
              disabled={!selectedCategories && !selectedProducts.length}
              onClick={clearFilter}
            >
              Clear
            </Button>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            style={{ height: "90vh" }}
            justifyContent="space-between"
          >
            <Stack direction="column" spacing={2}>
              <DropdownMenu
                disabled={false}
                options={catagories}
                onSelect={handleCategorySelect}
                selectedOptions={selectedCategories}
              />
              <DropdownMenu
                disabled={!selectedCategories}
                options={products}
                onSelect={handleProductSelect}
                selectedOptions={selectedProducts}
              />
              <Stack direction="column" alignItems="flex-start" spacing={1}>
                {getProductLabels()}
              </Stack>
            </Stack>

            <Button
              variant="contained"
              onClick={handleClick}
              disabled={loading || !runReport}
            >
              {loading ? (
                <>
                  processing... <CircularProgress size={24} color="inherit" />
                </>
              ) : (
                " Run Report"
              )}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack
            direction="column"
            spacing={2}
            style={{ height: "90vh" }}
            justifyContent="center"
          >
            {defaultChart === PIE_CHART ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={getGraphOptions(productData(PIE_CHART), PIE_CHART)}
              />
            ) : null}
            {defaultChart === COLUMN_CHART ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={getGraphOptions(
                  productData(COLUMN_CHART),
                  COLUMN_CHART
                )}
              />
            ) : null}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
