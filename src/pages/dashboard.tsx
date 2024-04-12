import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DropdownMenu from "../components/dropDown";
import getGraphOptions from "../helper/getGraphOptions";
import { Button, Container, Grid, Stack } from "@mui/material";
import { COLUMN_CHART, PIE_CHART } from "../constant/constant";
import { useChartData } from "../hooks/useChartData";
import HCButton from "../components/button";

const Dashboard = () => {
  // custom hook
  const {
    catagories,
    selectedCategories,
    products,
    selectedProducts,
    defaultChart,
    runReport,
    loading,
    handleCategorySelect,
    handleProductSelect,
    clearFilter,
    handleClick,
    setSelectedProducts,
    productData,
  } = useChartData();

  console.log("Products ::", catagories, products);

  const getProductLabels = () => {
    const removeProduct = (rmTitle: string) => {
      const newselectedProducts = selectedProducts.filter(
        ({ title }) => title !== rmTitle
      );
      setSelectedProducts(newselectedProducts);
    };
    return (
      <>
        {selectedProducts?.map(
          ({ title, id }: { title: string; id: number }) => (
            <label key={id} onClick={() => removeProduct(title)}>
              {title}
            </label>
          )
        )}
      </>
    );
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid item xs={4}>
          <Stack spacing={2} flexGrow={1} height="100%">
            <Stack
              direction="row"
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

            <Stack flexGrow={1} spacing={2}>
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

            <HCButton
              loading={loading}
              handleClick={handleClick}
              disabled={loading || !runReport}
            />
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
