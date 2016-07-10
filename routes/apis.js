var db  = require('../db');
var mysql  = require('mysql');

module.exports = {
	configure: function(app){
		app.post('/login/', function(req, res){
			db.acquire(function(err, con){				
				console.log(req.body);
				con.query('SELECT * FROM users WHERE Username=? AND Password=?', [req.body.username, req.body.password], function(err, results){						
					if (err){
						res.send({status: 1, message: 'Error'});
					}else{
						console.log(results.length);
						res.send({status: 0, message: 'success'});
					}	

				})
				
				//con.query("select id from users")
			})
		});
	}
}