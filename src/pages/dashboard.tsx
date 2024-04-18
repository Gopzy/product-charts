import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SingleDropdownMenu from "../components/singleDropDown";
import getGraphOptions from "../helper/getGraphOptions";
import { Box, Button, Container, Grid, InputLabel, Stack } from "@mui/material";
import { COLUMN_CHART, PIE_CHART } from "../constant/constant";
import { useChartData } from "../hooks/useChartData";
import HCButton from "../components/button";
import MultiDropDown from "../components/multiDropDown";

const Dashboard = () => {
  const {
    catagories,
    selectedCategories,
    products,
    selectedProducts,
    selectedGraphProducts,
    defaultChart,
    runReport,
    loading,
    handleCategorySelect,
    handleProductSelect,
    clearFilter,
    handleClick,
    graphData,
  } = useChartData();

  const getProductLabels = () => {
    return (
      <>
        {selectedGraphProducts?.map((el, index) => (
          <InputLabel key={index}>{el?.title}</InputLabel>
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
        <Grid item xs={3}>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderColor: "grey.500",
              border: 1,
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
                  selectedOptions={selectedGraphProducts}
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

        <Grid item xs={9}>
          <Stack
            direction="column"
            spacing={2}
            style={{ height: "90vh" }}
            justifyContent="center"
          >
            <HighchartsReact
              highcharts={Highcharts}
              options={getGraphOptions(graphData(defaultChart), defaultChart)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
