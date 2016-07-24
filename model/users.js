var db  = require('../db');

function User(){

	this.login = function(user, res){
		db.acquire(function(err, con){				
			console.log(user);
			con.query('SELECT * FROM users WHERE Username=? AND Password=?', [user.username, user.password], function(err, results){						
				if (err){
					res.send({status: 0, message: 'Error'});
				}else{
					console.log(results.length);
					if (results.length==0){
						res.send({status: 0, message: 'Invalid username/password'});
					}else{
						setTimeout(function(){
							res.send({status: 1, message: 'success'});
						},3000);
						
					}
				}	

			})
		})
	}
}

module.exports = new User();
