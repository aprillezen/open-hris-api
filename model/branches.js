var db  = require('../db');

function branches(){
	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM branches', function(err, results){						
				con.release()
				setTimeout(function(){
					if (err){					
						res.send({status: 0, message: 'Database error'});
					}else{
						res.send({status: 1, data: results});					
					}	
				},3000);				
			})
		})
	}
	this.edit = function(id, res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM branches WHERE id=?', id, function(err, results){						
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
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM branches WHERE branchname=?', data.branchname, function(err, results){											
					if (results.length>0){
						res.send({status: 0, message: 'Branch already exist!'});
					}else{
						con.query('INSERT INTO branches SET ?', data, function(err, results){																	
							if (err){
								res.send({status: 0, message: 'Database error'});
							}else{
								con.query('SELECT * FROM branches ORDER BY id', function(err, results){													
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
				con.query('SELECT * FROM branches WHERE branchname=? AND id<>?', [data.branchname, data.id], function(err, results){
					if (results.length>0){
						res.send({status: 0, message: 'Branch already exist!'});
					}else{
						con.query('UPDATE branches SET ? WHERE id=?', [data, data.id], function(err, results){										
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
				con.query('DELETE FROM branches WHERE id=?', id, function(err, results){										
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

module.exports = new branches();
