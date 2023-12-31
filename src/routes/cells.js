const Router = require('koa-router');
const authUtils = require('../modules/auth');

const router = new Router();

//lista de las celdas de un tablero específico
router.get('cells.show', '/:gameId', authUtils.checkUser, async (ctx) => {
    try {
        const board = await ctx.orm.Cell.findAll({
            where: { gameId: ctx.params.gameId },
            order: [['row', 'ASC'], ['column', 'ASC']]
          });
          
        ctx.body = board;
        ctx.status = 200;
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});


module.exports = router
