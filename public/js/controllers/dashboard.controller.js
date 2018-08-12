angular.module('dashboardcontroller', [])

	// inject the Todo service factory into our controller
	.controller('dashBoardController', ['$scope','$http','Dashboard', function($scope, $http, Dashboard) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.adminLoginData={}

		$scope.showerror=false;

		var categoryObj = {};
		var categoryArray=[] ;
		var tablesObj;
		var ordersObj;
		$scope.currentTable=0;
		$scope.tableStatus=["free","occupied"];


		

		initializationDashboard();


		function initializationDashboard(){

			console.log("hello");
			Dashboard.getAllTable().then(function(data){
				
				$scope.tablesObj=data.data.tables;


				Dashboard.getAllOrder().then(function(data){
					ordersObj=data.data.orders;
					console.log(ordersObj);
					angular.forEach(ordersObj, function(order, key) {


						if(categoryObj[order.table.table_number]){
							
							categoryObj[order.table.table_number].push(order);
						}else{
							
							categoryObj[order.table.table_number] = [];

							categoryObj[order.table.table_number] = [order];
						}

					});
					$scope.ordersObj=categoryObj;

					angular.forEach($scope.tablesObj,function(table,key){

						if(categoryObj[table.table_number]){
							table.ordersLength=categoryObj[table.table_number].length;

						}else{
							table.ordersLength=0;

						}


					})





				})
			})

		}

		$scope.changeTableStatus=function(index,tableNumber,restaurantId){
			var postTable={};
		
			postTable.status=$scope.tablesObj[index].status;
			postTable.tableNumber=tableNumber;
			postTable.restaurantId=restaurantId;
			Dashboard.changeTableStatus(postTable).then(function(data){

				var tableObj=data.data;
				console.log(tableObj);
				
				if(tableObj.status==0){
					$scope.tablesObj[index].status=tableObj.table.status;


				}else{
					

				}
			})

		}


		$scope.viewOrders=function(number){

			$scope.orders=categoryObj[number];

			$scope.currentTable=number;



		}

		$scope.CancelOrder=function(orderID,index){

			console.log(orderID,index);
			Dashboard.deleteOrder(orderID).then(function(data){

				var orderObj=data.data;
				console.log(orderObj);

				if(orderObj.status==0){
					$scope.orders[index].cancelled=true;


				}else{

				}


			})

		}

		setInterval(checkTableUpdate, 20000);

		function checkTableUpdate(){

			var newCategoryObj={};

			Dashboard.getAllOrder().then(function(data){
				ordersObj=data.data.orders;
				
				angular.forEach(ordersObj, function(order, key) {


					if(newCategoryObj[order.table.table_number]){
						
						newCategoryObj[order.table.table_number].push(order);
					}else{
						
						newCategoryObj[order.table.table_number] = [];

						newCategoryObj[order.table.table_number] = [order];
					}

				});
				var newOrdersObj=newCategoryObj;
				angular.forEach($scope.tablesObj,function(table,key){

					if(newOrdersObj[table.table_number]){
						if(table.ordersLength<newOrdersObj[table.table_number].length){
							table.new=true;
							table.ordersLength=newOrdersObj[table.table_number].length;

						}else{
							table.new=false;

						}

					}else{
						table.ordersLength=0;
						table.new=false;

					}


				})

				categoryObj=newOrdersObj;







			})
		}

		
		

		
	}]);