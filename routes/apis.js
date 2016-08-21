var db  = require('../db');
var profile = require('../model/company_profile')
var department = require('../model/department')
var branches = require('../model/branches')
var employee = require('../model/employee')
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

	},
	configureBranches: function(app){	
		app.get('/branches/', function(req, res){
			branches.get(res);
		});

		app.get('/branches/edit/:id/', function(req, res){
			branches.edit(req.params.id, res);
		});

		app.post('/branches/add/', function(req, res){
			branches.save(req.body, res);
		});

		app.post('/branches/update/', function(req, res){
			branches.update(req.body, res);
		});

		app.get('/branches/delete/:id/', function(req, res){
			branches.delete(req.params.id, res);
		});

	},
	configureEmployee: function(app){	
		app.get('/employee/', function(req, res){
			employee.get(res);
		});

		app.get('/employee/edit/:id/', function(req, res){
			employee.edit(req.params.id, res);
		});

		app.post('/employee/add/', function(req, res){
			employee.save(req.body, res);
		});

		app.post('/employee/update/', function(req, res){
			employee.update(req.body, res);
		});

		app.get('/employee/delete/:id/', function(req, res){
			employee.delete(req.params.id, res);
		});

		app.get('/employee/list/', function(req, res){
			employee.getlist(res);
		});

	}

}