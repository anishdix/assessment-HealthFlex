const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`server listing in port ${process.env.PORT}`);
});
