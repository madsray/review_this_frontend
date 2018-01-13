const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.listen(PORT, () => {
  console.log("===================================================");
  console.log("Dinner and a Movie App is running on port: ", PORT);
  console.log("===================================================");
})
