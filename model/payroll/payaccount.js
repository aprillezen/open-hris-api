var db  = require('../../db');

function payaccount(){
	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM py_payaccount', function(err, results){						
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
			con.query('SELECT * FROM py_payaccount WHERE id=?', id, function(err, results){										
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{		
					if (results.length>0){		
						res.send({status: 1, data: results[0] });	
					}else{
						res.send({status: 0, message: "Pay account does not exists!" });
					}												
				}	
			})
			con.release()
		})
	}
	this.save = function(data, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM py_payaccount WHERE paycode=?', data.title, function(err, results){											
					if (results.length>0){
						res.send({status: 0, message: 'Pay account code already exist!'});
					}else{
						con.query('INSERT INTO py_payaccount SET ?', data, function(err, results){																	
							if (err){
								res.send({status: 0, message: 'Database error'});
							}else{
								con.query('SELECT * FROM py_payaccount ORDER BY id', function(err, results){													
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
				con.query('SELECT * FROM py_payaccount WHERE title=? AND id<>?', [data.title, data.id], function(err, results){
					if (results.length>0){
						res.send({status: 0, message: 'Pay account code already exist!'});
					}else{
						con.query('UPDATE py_payaccount SET ? WHERE id=?', [data, data.id], function(err, results){										
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
				con.query('DELETE FROM py_payaccount WHERE id=?', id, function(err, results){										
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{
					res.send({status: 1, message: 'Success'});					
				}	
				})
			},2000)		
			con.release()	
		})
	},
	this.getlist = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT id as value, CONCAT(paycode,"-", description) AS label FROM py_payaccount', function(err, results){						
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

module.exports = new payaccount();
