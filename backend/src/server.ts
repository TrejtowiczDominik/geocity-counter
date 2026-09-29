import app from "./app";
import { config } from "./configuration/config";

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
});
