import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SingleDropdownMenu from "../components/singleDropDown";
import getGraphOptions from "../helper/getGraphOptions";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import { COLUMN_CHART, PIE_CHART } from "../constant/constant";
import { useChartData } from "../hooks/useChartData";
import HCButton from "../components/button";
import MultiDropDown from "../components/multiDropDown";

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
    graphData,
  } = useChartData();

  const getProductLabels = () => {
    return (
      <>
        {selectedProducts?.map((el, index) => (
          <label key={index}>{el}</label>
        ))}
      </>
    );
  };

  return (
    <Container>
      <Grid
        container
        paddingTop={5}
        paddingBottom={5}
        spacing={2}
        sx={{ height: "100vh" }}
      >
        <Grid item xs={4}>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderColor: "grey.500",
              //   top: 0,
              //   left: 0,
              border: 1,
              position: "fixed",
              width: "300px",
              height: "85vh",
              padding: "20px",
            }}
          >
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
                <SingleDropdownMenu
                  disabled={false}
                  options={catagories}
                  onSelect={handleCategorySelect}
                  selectedOptions={selectedCategories}
                />
                <MultiDropDown
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
          </Box>
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
                options={getGraphOptions(graphData(PIE_CHART), PIE_CHART)}
              />
            ) : null}
            {defaultChart === COLUMN_CHART ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={getGraphOptions(graphData(COLUMN_CHART), COLUMN_CHART)}
              />
            ) : null}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
