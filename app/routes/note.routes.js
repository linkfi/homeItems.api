const notes = require('../controllers/item.controller');

module.exports = (app) =>{

    app.post('/items', notes.create);

    app.get('/items', notes.findAll);

    app.get('/items/:itemId', notes.findOne );

    app.put('/items/:itemId', notes.update);

    app.delete('/items/:itemId', notes.delete);

}