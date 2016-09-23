var db  = require('../db');

function employee(){
	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM employee', function(err, results){						
				con.release()
				setTimeout(function(){
					if (err){					
						res.send({status: 0, message: 'Database error'});
					}else{
						res.send({status: 1, data: results});					
					}	
				},1000);				
			})
		})
	}
	this.edit = function(id, res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM employee WHERE id=?', id, function(err, results){						
				con.release()
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{
					res.send({status: 1, data: results[0]});
					// setTimeout(function(){
					// 	res.send({status: 1, data: results});
					// },3000);
				}	
			})
		})
	}
	this.save = function(data, res){	
	 	//console.log(data)	
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM employee WHERE employeeId=?', data.employeeId, function(err, results){											
					if (results.length>0){
						res.send({status: 0, message: 'Employee already exist!'});
					}else{
						con.query('INSERT INTO employee SET ?', data, function(err, results){																	
							if (err){
								res.send({status: 0, message: err});
							}else{
								con.query('SELECT * FROM employee ORDER BY id', function(err, results){													
									res.send({status: 1, data: results[results.length-1], message: 'Success'});				
								})												
							}	
						})
					}
				})							
				con.release()	
			},1000);				
		})
	}
	this.update = function(data, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM employee WHERE employeeId=? AND id<>?', [data.employeeId, data.id], function(err, results){
					if (results.length>0){
						res.send({status: 0, message: 'Employee already exist!'});
					}else{
						con.query('UPDATE employee SET ? WHERE id=?', [data, data.id], function(err, results){										
							if (err){
								res.send({status: 0, data: data, message: 'Database error'});
							}else{
								res.send({status: 1, message: 'Success'});					
							}	
						})
					}
				})				
			},1000)		
			con.release()			
		})
	}

	this.delete = function(id, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){	
				con.query('DELETE FROM employee WHERE id=?', id, function(err, results){										
					if (err){
						res.send({status: 0, message: 'Database error'});
					}else{
						con.query('DELETE FROM employee_employment WHERE id=?', id)
						res.send({status: 1, message: 'Success'});					
					}	
				})

			},1000)		
			con.release()	
		})
	}

	this.getlist = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT id as value, CONCAT(fname," ", lname) AS label FROM employee', function(err, results){						
				con.release()				
				if (err){					
					res.send({status: 0, message: 'Database error'});
				}else{
					res.send({status: 1, data: results});					
				}						
			})
		})
	}

	this.getpersonallist = function(res){
		db.acquire(function(err, con){	
			setTimeout(function(){	
				var sql = "SELECT employee.id, employeeId, CONCAT(fname,' ', lname) AS fullname, jobtitles.title as jobtitle "
					sql = sql +	' FROM jobtitles '
					sql = sql +	' LEFT OUTER JOIN employee_employment ON jobtitles.id=employee_employment.jobtitle '
					sql = sql +	' RIGHT OUTER JOIN employee ON employee_employment.id=employee.id'					
					con.query(sql, function(err, results){							
						if (err){
							res.send({status: 0, message: 'Database error'});
						}else{
							res.send({status: 1, data: results});									
						}	
					})
			},1000)		
			con.release()	
		})
	}

	this.getpersonal = function(id, res){
		db.acquire(function(err, con){	
			setTimeout(function(){	
				var sql = "SELECT employee.id, employeeId, CONCAT(fname,' ', lname) AS fullname, jobtitles.title as jobtitle "
					sql = sql +	' FROM jobtitles '
					sql = sql +	' LEFT OUTER JOIN employee_employment ON jobtitles.id=employee_employment.jobtitle '
					sql = sql +	' RIGHT OUTER JOIN employee ON employee_employment.id=employee.id'					
					sql = sql +	' WHERE employee.id = ?'					
					con.query(sql, id, function(err, results){							
						if (err){
							res.send({status: 0, message: 'Database error'});
						}else{
							if (results.length>0){
								res.send({status: 1, data: results[0]});	
							}else{
								res.send({status: 0, message: 'No record'});
							}										
						}	
					})
			},1000)		
			con.release()	
		})
	}



	this.getemployment = function(id, res){
		db.acquire(function(err, con){	
			setTimeout(function(){	
				var sql = 'SELECT employee_employment.id, employee_employment.startdate, jobtitles.title as jobtitle,'
					sql = sql +	' employee_employment.joblevel,employee_employment.category, employee_employment.schedule,'
					sql = sql +	' employee_employment.empstatus, employee_employment.separationdate,employee_employment.paymentmode,'
					sql = sql +	' branches.branchname AS branch, department.description AS department, '
					sql = sql +	' employee_employment.sssno, employee_employment.philhealthno, employee_employment.pagibigno,'
					sql = sql +	' employee_employment.tin, py_taxstatus.taxcode as taxstatus'
					sql = sql +	' FROM employee_employment'
					sql = sql +	' INNER JOIN jobtitles ON employee_employment.jobtitle=jobtitles.id'
					sql = sql +	' INNER JOIN branches ON employee_employment.branch=branches.id'
					sql = sql +	' INNER JOIN department ON employee_employment.department=department.id'
					sql = sql +	' INNER JOIN py_taxstatus ON employee_employment.taxstatus=py_taxstatus.id'
					sql = sql +	' WHERE employee_employment.id = ?'					
					con.query(sql, id, function(err, results){							
						if (err){
							res.send({status: 0, message: 'Database error'});
						}else{
							if (results.length>0){
								res.send({status: 1, data: results[0]});	
							}else{
								res.send({status: 0, message: 'No record'});
							}										
						}	
					})
			},1000)		
			con.release()	
		})
	}

	this.employmentedit = function(id, res){
		db.acquire(function(err, con){	
			setTimeout(function(){	
				var retdata = {
					'employment': {},					
					'jobtitles': [],
					'branches': [],
					'department': [],
					'taxstatus': [],
					'withdata': false,
					'haserror': false,
					'message':''
				}
				var sql = 'SELECT * FROM employee_employment WHERE id = ?'					
				con.query(sql, id, function(err, results){							
					if (err){						
						retdata.haserror = true;
						retdata.message = err;
					}else{						
						if (results.length>0){
							retdata.employment = results[0];
							retdata.withdata = true;													
						}														
					}	
				})
				con.query('SELECT id as value, title AS label FROM jobtitles', function(err, results){														
					if (!err){		
						retdata.jobtitles = results;											
					}							
				})	
				con.query('SELECT id as value, branchname AS label FROM branches', function(err, results){														
					if (!err){		
						retdata.branches = results;											
					}							
				})	
				con.query('SELECT id as value, description AS label FROM department', function(err, results){														
					if (!err){		
						retdata.department = results;											
					}							
				})
				con.query('SELECT id as value, taxcode AS label FROM py_taxstatus', function(err, results){														
					if (!err){		
						retdata.taxstatus = results;											
					}	
					//console.log(retdata);
					res.send({ data : retdata });										
				})				
			},1000)		
			con.release()	
		})
	}

	this.addEmployment = function(data, res){		 	
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('INSERT INTO employee_employment SET ?', data, function(err, results){																	
					if (err){
						res.send({status: 0, message: err});
					}else{
						res.send({status: 1, message: 'Success'});										
					}	
				})						
				con.release()	
			},1000);				
		})
	}
	this.updateEmployment = function(data, res){		 	
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('UPDATE employee_employment SET ? WHERE id=?', [data, data.id], function(err, results){										
					if (err){
						res.send({status: 0, data: data, message: 'Database error'});
					}else{
						res.send({status: 1, message: 'Success'});					
					}	
				})					
				con.release()	
			},1000);				
		})
	}
}

module.exports = new employee();





