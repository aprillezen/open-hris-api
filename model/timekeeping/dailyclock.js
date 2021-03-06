var db  = require('../../db');

function dailyclock(){
	this.get = function(id, datestart, dateend, res){
		db.acquire(function(err, con){				
			var sql = "SELECT * FROM tm_dailyclock WHERE employeeId=? AND (transdate BETWEEN '" + datestart + "' AND '"+ dateend +"')";			
			con.query(sql , id, function(err, results){						
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
			con.query('SELECT * FROM tm_dailyclock WHERE id=?', id, function(err, results){										
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{		
					if (results.length>0){		
						res.send({status: 1, data: results[0] });	
					}else{
						res.send({status: 0, message: "Shift does not exists!" });
					}												
				}	
			})
			con.release()
		})
	}
	this.save = function(data, res){		
		// db.acquire(function(err, con){	
		// 	setTimeout(function(){
		// 		con.query('SELECT * FROM tm_dailyclock WHERE description=?', data.description, function(err, results){											
		// 			if (results.length>0){
		// 				res.send({status: 0, message: 'Shift already exist!'});
		// 			}else{						
		// 				con.query('INSERT INTO tm_dailyclock SET ?', data, function(err, results){																	
		// 					if (err){
		// 						console.log(err)
		// 						res.send({status: 0, message: 'Database error'});
		// 					}else{
		// 						con.query('SELECT * FROM tm_dailyclock ORDER BY id', function(err, results){													
		// 							res.send({status: 1, data: results[results.length-1], message: 'Success'});				
		// 						})												
		// 					}	
		// 				})
		// 			}
		// 		})							
		// 		con.release()	
		// 	},1000);				
		// })
	}
	this.update = function(data, res){		
		// db.acquire(function(err, con){	
		// 	setTimeout(function(){
		// 		con.query('SELECT * FROM tm_dailyclock WHERE description=? AND id<>?', [data.description, data.id], function(err, results){
		// 			if (results.length>0){
		// 				res.send({status: 0, message: 'Shift already exist!'});
		// 			}else{
		// 				con.query('UPDATE tm_dailyclock SET ? WHERE id=?', [data, data.id], function(err, results){										
		// 					if (err){
		// 						res.send({status: 0, data: data, message: 'Database error'});
		// 					}else{
		// 						res.send({status: 1, message: 'Success'});					
		// 					}	
		// 				})
		// 			}
		// 		})				
		// 	},1000)		
		// 	con.release()			
		// })
	}

	this.delete = function(id, res){		
		db.acquire(function(err, con){	
			setTimeout(function(){	
				con.query('DELETE FROM tm_dailyclock WHERE id=?', id, function(err, results){										
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

module.exports = new dailyclock();


