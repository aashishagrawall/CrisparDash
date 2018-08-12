'use strict';


module.exports = function(app){

	var controller = require('../controllers/index.controller');

	app.route('/').get(controller.homePage);	
	app.route('/home').get(controller.homePage2);
	app.route('/dashboard').get(controller.dashboard);
	app.route('/data').get(controller.someData);
	app.route('/getAllOrder').get(controller.getAllOrder);
	app.route('/getAllTable').get(controller.getAllTable);
	app.route('/verifyAdminDetails/:username/:password').get(controller.verifyAdminDetails);
	app.route('/deleteOrder/:id').delete(controller.deleteOrder);
   app.route('/changeTableStatus').post(controller.changeTableStatus);	
	//app.route('/verifyAdminDetails').post(controller.verifyAdminDetailsPost);


	
}