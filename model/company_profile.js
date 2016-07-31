var db  = require('../db');

function profile(){

	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM companyprofile', function(err, results){						
				con.release()
				if (err){
					res.send({status: 0, message: 'Error'});
				}else{
					setTimeout(function(){
						res.send({status: 1, data: results});
					},3000);
				}	

			})
		})
	}

	this.update = function(profile, res){
		db.acquire(function(err, con){				
			con.query('UPDATE companyprofile SET ? WHERE id=?', [profile, profile.id], function(err, results){						
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

module.exports = new profile();
