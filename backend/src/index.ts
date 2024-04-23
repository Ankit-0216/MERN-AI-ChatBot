import app from "./app.js";
import { connectToDatabase } from "./db/database.js";

const PORT = process.env.PORT || 4000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is up and running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
