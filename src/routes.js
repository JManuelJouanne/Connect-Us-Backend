const Router = require('koa-router');
const jwtMiddleware = require('koa-jwt');
const users = require('./routes/users');
const games = require('./routes/games');
const players = require('./routes/players');
const cells = require('./routes/cells');
const authentication = require('./routes/authentication');
const dotenv = require('dotenv');

dotenv.config();

const router = new Router();

router.use("/games", games.routes());
router.use("/players", players.routes());
router.use("/cells", cells.routes());
router.use(authentication.routes());
router.use("/users", users.routes()); //mover

// rotas protegidas (debajo de este middleware)
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));


module.exports = router;