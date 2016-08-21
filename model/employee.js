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
}

module.exports = new employee();





