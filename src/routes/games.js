const Router = require('koa-router');
const games = require('./../modules/games');
const authUtils = require('../modules/auth');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = new Router();

//lista de todos los games
router.get('games.list', '/', authUtils.checkAdmin, async (ctx) => {
    try {
        const games = await ctx.orm.Game.findAll();
        ctx.body = games;
        ctx.status = 200;
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});

//un game específico
router.get('game.show', '/:id', authUtils.checkUser, async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.id);
        ctx.body = game;
        ctx.status = 200;
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});

//crear un nuevo game con amigo
router.post('friend_game.create', '/', authUtils.checkUser, async (ctx) => {
    try {
        const secret = process.env.JWT_SECRET;
        const token = ctx.request.header.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        const userId = parseInt(decoded.sub, 10);

        const { game, player } = await games.create_game(userId, 1);
        ctx.body = {player: player, game: game};
        ctx.status = 200;
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});

router.delete('game.delete', '/:id', authUtils.checkUser, async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.id);
        const players = await ctx.orm.Player.findAll({where:{gameId:ctx.params.id}});
        for (let i = 0; i < players.length; i++){
            await players[i].destroy();
        }
        const cells = await ctx.orm.Cell.findAll({where:{gameId:ctx.params.id}});
        for (let i = 0; i < cells.length; i++){
            await cells[i].destroy();
        }
        await game.destroy();
        ctx.body = {message: "Partida Eliminada"};
        ctx.status = 200;
    } catch (error){        
        ctx.body = error;
        ctx.status = 400;
    }
});


module.exports = router;
