About the app:

An application to Display Pie and Bar Chart dynamically using Products and Categories data.

Users have the option to select the available category from the drop down filter and can select the product/ products of that selected category after selecting the category.

Once the option (category or products) is selected Pie charts of the selected category will be shown.

When the “Run Report” button is clicked, after 3 seconds the “Bar column chart” will be displayed.

Users have the option to select single or multiple products from the filter.

All the validation for the Filters, Run Report and Clear button is handled from frond end.

Folder Structure:

1. Pages
   Dashboard : main landing page

2. Components
   button: Button component with loading state
   singledopDown: Dropdown for single selector (category)
   multiDropDown: Dropdown for single selector (products)
3. Hook
   useChartData: Custom hook to manage all local state and perform Network calls using hooks.
4. Helper
   getGrapOptions: to generate graph options objects for High charts (“Pie” and “Column” ).
   getAxisValue: to get the X and Y axis value for the graph.
5. Constant : define the constant variables and api constants
6. Type: Defined the common type

Framework used

Typescript: for type definition throughout the whole application (Product and Category data) .
Axios: To fetch the get apis and process it. (Product and Category Api’s)
React Hooks: useEffect, useState, useCallBack, useChartData (Custom Hook).
Material UI: For designing UI components and styling.
High Chart: For Column bar and Pie chart.
Css

How to run the app,

1. yarn or npm install : install all the dependencues
2. yarn start or npm start : to start the android app
