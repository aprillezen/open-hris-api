var db  = require('../db');
var user = require('../model/users')
var batch = require('../model/batch')

module.exports = {
	configure: function(app){
		app.post('/login/', function(req, res){
			user.login(req.body, res);
		});

		app.get('/batch/', function(req, res){
			batch.get(res);
		});

		app.get('/batch/edit/:id/', function(req, res){
			batch.edit(req.params.id, res);
		});

		app.post('/batch/add/', function(req, res){
			batch.save(req.body, res);
		});

		app.post('/batch/update/', function(req, res){
			batch.update(req.body, res);
		});

		app.get('/batch/delete/:id/', function(req, res){
			batch.delete(req.params.id, res);
		});
	}
}