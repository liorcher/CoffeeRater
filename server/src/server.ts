import app from "./app";
import logger from "./utils/logger.util";
const port = process.env.PORT || 9000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
