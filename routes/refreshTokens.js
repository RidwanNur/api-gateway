const express = require('express');
const router = express.Router();
const refreshTokensHandler = require('./handler/refresh_tokens/refreshToken');

router.post('/', refreshTokensHandler.HandlerRefreshToken);

module.exports = router;
