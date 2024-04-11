import { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import DropdownMenu from "../components/dropDown";
import getGraphOptions from "../helper/getGraphOptions";
import { Button, CircularProgress, Container, Grid } from "@mui/material";
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

  const [buttonClicked, setButtonClicked] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const productData = selectedProducts.length ? selectedProducts : products;

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
    setButtonClicked(false);
  };

  const handleProductSelect = (selectedValue) => {
    const selectedProduct = products.filter(
      ({ title }) => title === selectedValue
    );

    !selectedProducts.some(({ title }) => title === selectedValue) &&
      setSelectedProducts([...selectedProducts, selectedProduct?.[0]]);

    setButtonClicked(false);
  };

  const clearFilter = () => {
    setSelectedCategories(null);
    setSelectedProducts([]);
    setProducts([]);
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
            {title} <br />
          </label>
        ))}
      </>
    );
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setButtonClicked(true);
    }, 3000);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <h2>Filters</h2>
            </Grid>
            <Grid item xs={10}>
              <Button onClick={clearFilter}>Clear</Button>
            </Grid>
            <Grid item xs={12}>
              <DropdownMenu
                disabled={false}
                options={catagories}
                onSelect={handleCategorySelect}
                selectedOptions={selectedCategories}
              />
            </Grid>
            <Grid item xs={12}>
              <DropdownMenu
                disabled={!selectedCategories}
                options={products}
                onSelect={handleProductSelect}
                selectedOptions={selectedProducts}
              />
            </Grid>
            <Grid item xs={12}>
              {getProductLabels()}
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleClick}
                disabled={loading || buttonClicked}
              >
                {loading ? (
                  <>
                    processing... <CircularProgress size={24} color="inherit" />
                  </>
                ) : (
                  " Run Report"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          {!buttonClicked ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={getGraphOptions(products, PIE_CHART)}
            />
          ) : null}
          {selectedCategories && buttonClicked ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={getGraphOptions(productData, COLUMN_CHART)}
            />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
