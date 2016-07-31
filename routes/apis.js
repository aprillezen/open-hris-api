var db  = require('../db');
var profile = require('../model/company_profile')
var orgunit = require('../model/orgunit')
var user = require('../model/user')

module.exports = {
	configure: function(app){

		app.post('/login/', function(req, res){
			user.login(req.body, res);
		});

		app.post('/profile/update', function(req, res){
			profile.update(req.body, res);
		});

		app.get('/profile/', function(req, res){
			profile.get(res);
		});

		app.get('/units/', function(req, res){
			orgunit.get(res);
		});

		app.get('/units/edit/:id/', function(req, res){
			orgunit.edit(req.params.id, res);
		});

		app.post('/units/add/', function(req, res){
			orgunit.save(req.body, res);
		});

		app.post('/units/update/', function(req, res){
			orgunit.update(req.body, res);
		});

		app.get('/units/delete/:id/', function(req, res){
			orgunit.delete(req.params.id, res);
		});

	}
}