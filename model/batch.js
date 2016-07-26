var db  = require('../db');

function Batch(){
	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM batches', function(err, results){						
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
			con.query('SELECT * FROM batches WHERE id=?', id, function(err, results){						
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
	this.save = function(batch, res){
		console.log(batch)
		db.acquire(function(err, con){				
			con.query('INSERT INTO batches SET ?', batch, function(err, results){						
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
	this.update = function(batch, res){
		console.log(batch)
		db.acquire(function(err, con){				
			con.query('UPDATE batches SET ? WHERE id=?', [batch, batch.id], function(err, results){						
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
			con.query('DELETE FROM batches WHERE id=?', id, function(err, results){						
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

module.exports = new Batch();
