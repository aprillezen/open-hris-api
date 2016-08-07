var db  = require('../db');

function profile(){

	this.get = function(res){
		db.acquire(function(err, con){				
			con.query('SELECT * FROM companyprofile', function(err, results){						
				con.release()
				if (err){
					res.send({status: 0, message: 'Error'});
				}else{
					var data={}
					if (results.length>0){
						data = results[0]
					}
					
					setTimeout(function(){
						res.send({status: 1, data: data});
					},2000);
				}	

			})
		})
	}

	this.update = function(profile, res){
		
		db.acquire(function(err, con){		
			con.query('SELECT * FROM companyprofile', function(err, results){						
				if (results.length>0){
					con.query('UPDATE companyprofile SET ? WHERE id=?', [profile, profile.id], function(err, results){						
						con.release()
						setTimeout(function(){	
							if (err){
								res.send({status: 0, message: 'Database error'});
							}else{
								res.send({status: 1, message: 'Success'});							
							}	
						},3000);
					})
				}else{
					con.query('INSERT INTO companyprofile SET ?', profile, function(err, results){						
						con.release()
						setTimeout(function(){	
							if (err){
								res.send({status: 0, message: 'Database error'});
							}else{
								res.send({status: 1, message: 'Success'});
							}							
						},3000);										
					})
				}
			})
		})
	}
}

module.exports = new profile();
