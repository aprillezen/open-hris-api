var db  = require('../db');

function department(){
	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM department', function(err, results){						
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
			con.query('SELECT * FROM department WHERE id=?', id, function(err, results){										
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{		
					if (results.length>0){		
						var dept = results[0];		
						con.query('SELECT id as value, CONCAT(fname," ", lname) AS label FROM employee WHERE id=?', results[0].head, function(err1, res1){												
							var d = null;
							if (res1.length>0){						
								d = res1[0];
							}
							dept.head = d;							
							con.query('SELECT id as value, CONCAT(fname," ", lname) AS label FROM employee', function(err2, res2){														
								res.send({status: 1, data: dept , employees: res2});											
							})
						})	
					}else{
						res.send({status: 0, message: "Department does not exists!" });
					}									
				}	
			})
			con.release()
		})
	}
	this.save = function(data, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM department WHERE description=?', data.description, function(err, results){											
					if (results.length>0){
						res.send({status: 0, message: 'Department already exist!'});
					}else{
						con.query('INSERT INTO department SET ?', data, function(err, results){																	
							if (err){
								res.send({status: 0, message: 'Database error'});
							}else{
								con.query('SELECT * FROM department ORDER BY id', function(err, results){													
									res.send({status: 1, data: results[results.length-1], message: 'Success'});				
								})												
							}	
						})
					}
				})							
				con.release()	
			},2000);				
		})
	}
	this.update = function(data, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM department WHERE description=? AND id<>?', [data.description, data.id], function(err, results){
					if (results.length>0){
						res.send({status: 0, message: 'description already exist!'});
					}else{
						con.query('UPDATE department SET ? WHERE id=?', [data, data.id], function(err, results){										
							if (err){
								res.send({status: 0, data: data, message: 'Database error'});
							}else{
								res.send({status: 1, message: 'Success'});					
							}	
						})
					}
				})				
			},2000)		
			con.release()			
		})
	}

	this.delete = function(id, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){	
				con.query('DELETE FROM department WHERE id=?', id, function(err, results){										
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{
					res.send({status: 1, message: 'Success'});					
				}	
				})
			},2000)		
			con.release()	
		})
	}
}

module.exports = new department();
