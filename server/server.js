import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import logger from 'winston';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(morgan('tiny'));

app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

const server = app.listen(process.env.PORT || 3005, (err) => {
  if (err) {
    logger.error('Server Error: Cant Start !');
  } else {
    logger.info(`Server started on PORT: ${server.address().port} ENV: ${env}`);
  }
});

export default app;
