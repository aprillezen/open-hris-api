var db  = require('../db');

function User(){

	this.login = function(user, res){
		db.acquire(function(err, con){				
			console.log(user);
			con.query('SELECT * FROM users WHERE Username=? AND Password=?', [user.username, user.password], function(err, results){						
				con.release()
				if (err){
					res.send({status: 0, message: 'Error'});
				}else{
					console.log(results.length);
					if (results.length==0){
						res.send({status: 0, message: 'Invalid username/password'});
					}else{
						res.send({status: 1, message: 'success'});	
					}
				}	

			})
		})
	}
}

module.exports = new User();
