var db  = require('../db');

function jobtitles(){
	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM jobtitles', function(err, results){						
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
			con.query('SELECT * FROM jobtitles WHERE id=?', id, function(err, results){										
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{		
					if (results.length>0){		
						res.send({status: 1, data: results[0] });	
					}else{
						res.send({status: 0, message: "Job title does not exists!" });
					}												
				}	
			})
			con.release()
		})
	}
	this.save = function(data, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM jobtitles WHERE title=?', data.title, function(err, results){											
					if (results.length>0){
						res.send({status: 0, message: 'Job Title already exist!'});
					}else{
						con.query('INSERT INTO jobtitles SET ?', data, function(err, results){																	
							if (err){
								res.send({status: 0, message: 'Database error'});
							}else{
								con.query('SELECT * FROM jobtitles ORDER BY id', function(err, results){													
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
				con.query('SELECT * FROM jobtitles WHERE title=? AND id<>?', [data.title, data.id], function(err, results){
					if (results.length>0){
						res.send({status: 0, message: 'Job Title already exist!'});
					}else{
						con.query('UPDATE jobtitles SET ? WHERE id=?', [data, data.id], function(err, results){										
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
				con.query('DELETE FROM jobtitles WHERE id=?', id, function(err, results){										
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

module.exports = new jobtitles();
