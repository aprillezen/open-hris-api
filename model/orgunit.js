var db  = require('../db');

function orgunit(){
	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM organizational_unit', function(err, results){						
				con.release()
				if (err){					
					res.send({status: 0, message: 'Database error'});
				}else{
					res.send({status: 1, data: results});
					// setTimeout(function(){
					// 	res.send({status: 1, data: results});
					// },3000);
				}	
			})
		})
	}
	this.edit = function(id, res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM organizational_unit WHERE id=?', id, function(err, results){						
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
	this.save = function(unit, res){
		console.log(unit)
		db.acquire(function(err, con){				
			con.query('INSERT INTO organizational_unit SET ?', unit, function(err, results){						
				con.release()
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{
					res.send({status: 1, message: 'Success'});
					// setTimeout(function(){
					// 	res.send({status: 1, data: results});
					// },3000);
				}	
			})
		})
	}
	this.update = function(unit, res){
		//console.log(unit)
		db.acquire(function(err, con){				
			con.query('UPDATE organizational_unit SET ? WHERE id=?', [unit, unit.id], function(err, results){						
				con.release()
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{
					res.send({status: 1, message: 'Success'});
					// setTimeout(function(){
					// 	res.send({status: 1, data: results});
					// },3000);
				}	
			})
		})
	}

	this.delete = function(id, res){		
		db.acquire(function(err, con){				
			con.query('DELETE FROM organizational_unit WHERE id=?', id, function(err, results){						
				con.release()
				if (err){
					res.send({status: 0, message: 'Database error'});
				}else{
					res.send({status: 1, message: 'Success'});
					// setTimeout(function(){
					// 	res.send({status: 1, data: results});
					// },3000);
				}	
			})
		})
	}
}

module.exports = new orgunit();
