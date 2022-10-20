const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

// database connection
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1moqz.mongodb.net/?retryWrites=true&w=majority`).then(() => {
//   console.log(`Database connection is successful.`);
// })
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1moqz.mongodb.net/dbTourManagement`).then(() => {
  console.log(`Database connection is successful.`);
})
// mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
//   console.log(`Database connection is successful.`);
// })


// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
