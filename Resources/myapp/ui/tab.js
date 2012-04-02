(function() {
	myapp.tab = {};
	Titanium.include("vm.js");
	Titanium.include("volume.js");
	
	myapp.tab.createTab = function(num,cloudName,flag,apiUrl,opt,img){
		var apiKey = new Array(); 
		var secretKey = new Array();
	
		var btn = Ti.UI.createButton({
			backgroundImage:flag,
			height:11,
			width:16
		});
		
		var win = Ti.UI.createWindow({  
    		title:cloudName,
    		backgroundColor:'#fff',
       		rightNavButton:btn
		});

		win.addEventListener('open', function(){
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
		});
		
		var tab = Ti.UI.createTab({  
    		icon:'img/light_globe.png',
    		title:cloudName,
    		window:win
		});
		
		var data = [
			{title:'VM', hasChild:true, leftImage:'img/Crystal_Clear_app_network_local.png'},
			{title:'VOLUME', hasChild:true, leftImage:'img/Crystal_Clear_app_database.png'}
		];
		
		// TableViewの作成
    	var tableView =Ti.UI.createTableView({
      		data:data
    	});
			
    	win.add(tableView);
		
		tableView.addEventListener('click', function(event){
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
			
			//Ti.API.info("key:" + num + ":" + apiKey[num] +":"+secretKey[num]);
    		if(event.rowData.title == 'VM'){
  				if(apiKey[num] && secretKey[num]){
					var detailWin = myapp.tab.vm.createWin(cloudName,apiUrl,apiKey[num],secretKey[num],opt,tab,img);
					tab.open(detailWin);
				}
				else{
					alert("Please input API KEY & SECRET KEY.");
				}
			}
			else if(event.rowData.title == 'VOLUME'){
				if(apiKey[num] && secretKey[num]){
					var detailWin = myapp.tab.volume.createWin(cloudName,apiUrl,apiKey[num],secretKey[num],opt,tab,img);
					tab.open(detailWin);
				}
				else{
					alert("Please input API KEY & SECRET KEY.");
				}
			}
		});
  		return tab;
 	};
})();

