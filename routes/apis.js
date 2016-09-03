
var payaccount = require('../model/payaccount')
var leavetype = require('../model/leavetype')
var profile = require('../model/company_profile')
var department = require('../model/department')
var branches = require('../model/branches')
var employee = require('../model/employee')
var job = require('../model/jobtitles')
var user = require('../model/user')
var taxstatus = require('../model/taxstatus')


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
	configureJob: function(app){	
		app.get('/jobtitle/', function(req, res){
			job.get(res);
		});

		app.get('/jobtitle/edit/:id/', function(req, res){
			job.edit(req.params.id, res);
		});

		app.post('/jobtitle/add/', function(req, res){
			job.save(req.body, res);
		});

		app.post('/jobtitle/update/', function(req, res){
			job.update(req.body, res);
		});

		app.get('/jobtitle/delete/:id/', function(req, res){
			job.delete(req.params.id, res);
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

		app.get('/employee/employment/:id', function(req, res){
			employee.getemployment(req.params.id, res);
		});

		app.get('/employee/employment/edit/:id', function(req, res){
			employee.employmentedit(req.params.id, res);
		});

		app.post('/employee/employment/add/', function(req, res){
			employee.addEmployment(req.body, res);
		});

		app.post('/employee/employment/update/', function(req, res){
			employee.updateEmployment(req.body, res);
		});

	},
	configureLeaveType: function(app){	
		app.get('/lt/', function(req, res){
			leavetype.get(res);
		});

		app.get('/lt/edit/:id/', function(req, res){
			leavetype.edit(req.params.id, res);
		});

		app.post('/lt/add/', function(req, res){
			leavetype.save(req.body, res);
		});

		app.post('/lt/update/', function(req, res){
			leavetype.update(req.body, res);
		});

		app.get('/lt/delete/:id/', function(req, res){
			leavetype.delete(req.params.id, res);
		});
	},
	configurePayAccount: function(app){	
		app.get('/paycode/', function(req, res){
			payaccount.get(res);
		});

		app.get('/paycode/edit/:id/', function(req, res){
			payaccount.edit(req.params.id, res);
		});

		app.post('/paycode/add/', function(req, res){
			payaccount.save(req.body, res);
		});

		app.post('/paycode/update/', function(req, res){
			payaccount.update(req.body, res);
		});

		app.get('/paycode/delete/:id/', function(req, res){
			payaccount.delete(req.params.id, res);
		});

		app.get('/paycode/list/', function(req, res){
			payaccount.getlist(res);
		});
	},
	configureTaxStatus: function(app){	
		app.get('/taxstatus/', function(req, res){
			taxstatus.get(res);
		});

		app.get('/taxstatus/edit/:id/', function(req, res){
			taxstatus.edit(req.params.id, res);
		});

		app.post('/taxstatus/add/', function(req, res){
			taxstatus.save(req.body, res);
		});

		app.post('/taxstatus/update/', function(req, res){
			taxstatus.update(req.body, res);
		});

		app.get('/taxstatus/delete/:id/', function(req, res){
			taxstatus.delete(req.params.id, res);
		});
	},

}