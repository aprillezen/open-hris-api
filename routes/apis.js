var db  = require('../db');
var profile = require('../model/company_profile')
var department = require('../model/department')
var user = require('../model/user')

module.exports = {
	configureLogin: function(app){
		app.post('/login/', function(req, res){
			user.login(req.body, res);
		});		
	},
	configureProfile: function(app){	
		app.post('/profile/update', function(req, res){
			profile.update(req.body, res);
		});

		app.get('/profile/', function(req, res){
			profile.get(res);
		});
	},
	configureDept: function(app){	
		app.get('/department/', function(req, res){
			department.get(res);
		});

		app.get('/department/edit/:id/', function(req, res){
			department.edit(req.params.id, res);
		});

		app.post('/department/add/', function(req, res){
			department.save(req.body, res);
		});

		app.post('/department/update/', function(req, res){
			department.update(req.body, res);
		});

		app.get('/department/delete/:id/', function(req, res){
			department.delete(req.params.id, res);
		});

	}

}