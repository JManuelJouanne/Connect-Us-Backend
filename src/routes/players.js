const Router = require('koa-router');
const games = require('./../modules/games');

const router = new Router();

//lista de todos los players
router.get('players.list', '/', async (ctx) => {
    try {
        const players = await ctx.orm.Player.findAll();
        ctx.body = players;
        ctx.status = 200;
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});

//mostrar un player
router.get('player.show', '/:id', async (ctx) => {
    try{
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        ctx.body = player;
        ctx.status = 200;
    }
    catch(error){
        ctx.body = error;
        ctx.status = 400;
    }

});

//lista de los players de un usuario
router.get('player.list', '/user/:userId', async (ctx) => {
    try {
        const players = await ctx.orm.Player.findAll({where:{userId:ctx.params.userId}});
        ctx.body = players;
        ctx.status = 200;
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});

//lista de los players de un game
router.get('players.show', '/game/:gameId', async (ctx) => {
    try {
        const players = await ctx.orm.Player.findAll({where:{gameId:ctx.params.gameId}});
        ctx.body = players;
        ctx.status = 200;
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});

//unirse a partida con amigo
router.post('friend_player.join', '/:gameId', async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.gameId);
        if (game.friend === 1){
            await game.update({friend:2});
            const player = await games.create_player(ctx.request.body.userId, ctx.params.gameId);
            ctx.body = player;
            ctx.status = 200;
        } else {
            ctx.body = {message: "Ya hay dos jugadores en la partida"};
            ctx.status = 400;
        }
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});

//unirse a partida random
router.post('player.join', '/', async (ctx) => {
    try {
        const game = await ctx.orm.Game.findAll({where:{friend:0}});
        if (game.length > 0){
            await game[0].update({friend:2});
            const player = await games.create_player(ctx.request.body.userId, game[0].id);
            ctx.body = player;
            ctx.status = 200;
        } else {
            const game = await games.create_game(ctx.request.body.userId, 0);
            ctx.body = game;
            ctx.status = 200;
        }
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});

router.delete('player.delete', '/:id', async (ctx) => {
    try {
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        await player.destroy();
        ctx.body = {message: 'Player Eliminado'};
        ctx.status = 200;
    } catch (error){
        ctx.body = error;
        ctx.status = 400;
    }
});


module.exports = router;
