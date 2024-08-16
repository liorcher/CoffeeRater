import app from "./app";
import logger from "./utils/logger.util";
import http from 'http'
import https from 'https'
import fs from 'fs'
import path from "path";

const port = parseInt(process.env.PORT as string, 10) || 9000;
const host = '0.0.0.0';

const initApp = () => {
  if (process.env.NODE_ENV !== 'production') {
    logger.info('env - development')
    http.createServer(app).listen(port, host)
  }  else {
    const keyPath = path.join(__dirname, '../assets', 'client-key.pem');
    const certPath = path.join(__dirname, '../assets', 'client-cert.pem');
    
    // Read the key and cert files
    const privateKey = fs.readFileSync(keyPath, 'utf8');
    const certificate = fs.readFileSync(certPath, 'utf8');
    
    const credentials = { key: privateKey, cert: certificate };

    https.createServer(credentials, app).listen(port, host)
  }
}

initApp();

// app.listen(port, host, () => {
//   logger.info(`Server is running on port ${port}`);
// });

