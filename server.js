const express = require("express");
const app = express();

// Import index.js to run the application
require("./employee-tracker/index");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
