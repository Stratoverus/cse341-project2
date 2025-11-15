const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

if (process.env.HOST) {
  swaggerDocument.host = process.env.HOST;
} else {
  delete swaggerDocument.host;
}

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = router;