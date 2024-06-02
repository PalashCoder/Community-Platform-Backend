const app = require("./app");
const sequelize = require("./utils/database");
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });
