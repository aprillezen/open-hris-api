var db  = require('../../db');

function holiday(){	
	this.get = function(yr, res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM tm_holiday WHERE transyear=?', yr, function(err, results){						
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
			con.query('SELECT * FROM tm_holiday WHERE id=?', id, function(err, results){										
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{		
					if (results.length>0){		
						res.send({status: 1, data: results[0] });	
					}else{
						res.send({status: 0, message: "Holiday does not exists!" });
					}												
				}	
			})
			con.release()
		})
	}
	this.save = function(data, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){
				con.query('SELECT * FROM tm_holiday WHERE description=?', data.description, function(err, results){											
					if (results.length>0){
						res.send({status: 0, message: 'Holiday already exist!'});
					}else{						
						con.query('INSERT INTO tm_holiday SET ?', data, function(err, results){																	
							if (err){
								console.log(err)
								res.send({status: 0, message: 'Database error'});
							}else{
								con.query('SELECT * FROM tm_holiday ORDER BY id', function(err, results){													
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
				con.query('SELECT * FROM tm_holiday WHERE description=? AND id<>?', [data.description, data.id], function(err, results){
					if (results.length>0){
						res.send({status: 0, message: 'Holiday already exist!'});
					}else{
						con.query('UPDATE tm_holiday SET ? WHERE id=?', [data, data.id], function(err, results){										
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
				con.query('DELETE FROM tm_holiday WHERE id=?', id, function(err, results){										
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

module.exports = new holiday();


