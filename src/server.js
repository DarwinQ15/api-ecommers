const swaggerDocs = require("../swagger");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
  swaggerDocs(app, PORT)
});
