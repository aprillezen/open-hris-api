var db  = require('../db');

function leavetype(){
	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM lv_leavetpe', function(err, results){						
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
			con.query('SELECT * FROM lv_leavetpe WHERE id=?', id, function(err, results){										
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{		
					if (results.length>0){		
						var lt = results[0];		
						con.query('SELECT id as value, CONCAT(paycode,"-", description) AS label FROM py_payaccount WHERE id=?', results[0].linkId, function(err1, res1){												
							var d = null;
							if (res1.length>0){						
								d = res1[0];
							}
							lt.linkId = d;							
							con.query('SELECT id as value, CONCAT(paycode,"-", description) AS label FROM py_payaccount', function(err2, res2){														
								res.send({status: 1, data: lt , payaccount: res2});											
							})
						})	
					}else{
						res.send({status: 0, message: "Leave type does not exists!" });
					}									
				}	
			})
			con.release()
		})
	}
	this.save = function(data, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM lv_leavetpe WHERE leavecode=?', data.leavecode, function(err, results){											
					if (results.length>0){
						res.send({status: 0, message: 'leave code already exist!'});
					}else{
						con.query('INSERT INTO lv_leavetpe SET ?', data, function(err, results){																	
							if (err){
								res.send({status: 0, message: 'Database error'});
							}else{
								con.query('SELECT * FROM lv_leavetpe ORDER BY id', function(err, results){													
									res.send({status: 1, data: results[results.length-1], message: 'Success'});				
								})												
							}	
						})
					}
				})							
				con.release()	
			}, 1000);				
		})
	}
	this.update = function(data, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM lv_leavetpe WHERE leavecode=? AND id<>?', [data.leavecode, data.id], function(err, results){
					if (results.length>0){
						res.send({status: 0, message: 'leave code already exist!'});
					}else{
						con.query('UPDATE lv_leavetpe SET ? WHERE id=?', [data, data.id], function(err, results){										
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
				con.query('DELETE FROM lv_leavetpe WHERE id=?', id, function(err, results){										
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
}

module.exports = new leavetype();
