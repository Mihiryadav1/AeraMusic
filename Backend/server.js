import dotenv from "dotenv";
import application from "./application.js";
dotenv.config();

//PORT
const port = process.env.PORT;

application.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
