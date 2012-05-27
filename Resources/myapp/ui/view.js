(function() {
	myapp.view = {};
	Titanium.include("../subroutine.js");
	Titanium.include("vm.js");
	Titanium.include("volume.js");
		
	myapp.view.beginReloading = function(data, count, apiUrl, apiKey, secretKey, cmdLists,opt, cloudName){
		if(!apiKey || !secretKey || !apiKey[cloudName] || !secretKey[cloudName]){
			for(var cmd in cmdLists){
				count[cmd] = 'NA';
			}
		}
		else{	
			for(var cmd in cmdLists){		
				var url = myapp.sub.getUrl(apiUrl,apiKey[cloudName],secretKey[cloudName],cmdLists[cmd],opt);
 
  				var xhr = Ti.Network.createHTTPClient();
  				xhr.open('GET', url, false);
  				xhr.onload = function() {
    				var json = JSON.parse(this.responseText);
    				if(this.responseText.match(/listvirtualmachinesresponse/)){
	    				count['VM'] = json.listvirtualmachinesresponse.count;
	    				if(!count['VM']){
	    					count['VM'] = 0;
	    				}
	    			}
	    			else if(this.responseText.match(/listvolumesresponse/)){
	    				count['VOLUME'] = json.listvolumesresponse.count;
	    				if(!count['VOLUME']){
	    					count['VOLUME'] = 0;
	    				}
	    			}
				};				
  				xhr.onerror = function(event){
       				//alert(event);
       			};
  	 			xhr.send();
			}
			
		}
		data[0]['title'] = 'VM(' + count['VM'] +')';
		data[1]['title'] = 'VOLUME(' + count['VOLUME'] +')';
		return data;
	};

	
	myapp.view.createView = function(cloudName,flag,apiUrl,opt){

		var apiKey = new Array(); 
		var secretKey = new Array();
		var cmdLists = {
			'VM':'listVirtualMachines', 
			'VOLUME':'listVolumes'
			};
		var count = new Object();
		var data = [
			{title:'VM(' + count['VM'] +')', hasChild:true, leftImage:'img/Crystal_Clear_app_network_local.png', height:Ti.UI.FILL},
			{title:'VOLUME(' + count['VOLUME'] +')', hasChild:true, leftImage:'img/Crystal_Clear_app_database.png', height:Ti.UI.FILL}
		];	
		
		tabGroup.addEventListener('open', function(){	
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
			data = myapp.view.beginReloading(data, count, apiUrl, apiKey, secretKey, cmdLists,opt, cloudName);
			tableView.data = data;
		});
		
		var view = Ti.UI.createView();
		var border = Ti.UI.createView({
			backgroundColor:"#576c89",
			height:2,
			bottom:0
		});
		var tableHeader = Ti.UI.createView({
			backgroundColor:"#e2e7ed",
			width:320,
			height:60
		});
		tableHeader.add(border);

		var arrow = Ti.UI.createView({
			backgroundImage:"img/whiteArrow.png",
			width:23,
			height:60,
			bottom:10,
			left:20
		});

		var statusLabel = Ti.UI.createLabel({
			text:"Pull to reload",
			left:55,
			width:200,
			bottom:30,
			height:"auto",
			color:"#576c89",
			textAlign:"center",
			font:{fontSize:13,fontWeight:"bold"},
			shadowColor:"#999",
			shadowOffset:{x:0,y:1}
		});
		
		var actInd = Titanium.UI.createActivityIndicator({
			left:20,
			bottom:13,
			width:30,
			height:30
		});

		tableHeader.add(arrow);
		tableHeader.add(statusLabel);
		tableHeader.add(actInd);

		var pulling = false;
		var reloading = false;

    	var tableView =Ti.UI.createTableView({
      		data:data
    	});
	
		tableView.headerPullView = tableHeader;			
		view.add(tableView);
		
		apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
		secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
		data = myapp.view.beginReloading(data, count, apiUrl, apiKey, secretKey, cmdLists,opt, cloudName);
		tableView.data = data;
			
		tableView.addEventListener('click', function(event){
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
			
    		if(event.rowData.title.match(/VM/)){
  				if(apiKey[cloudName] && secretKey[cloudName]){
					var detailWin = myapp.tab.vm.createWin(cloudName,apiUrl,apiKey[cloudName],secretKey[cloudName],opt);
					tabGroup.activeTab.open(detailWin,{animated:true});
				}
				else{
					alert("Please input API KEY & SECRET KEY.");
				}
			}
			else if(event.rowData.title.match(/VOLUME/)){
				if(apiKey[cloudName] && secretKey[cloudName]){
					var detailWin = myapp.tab.volume.createWin(cloudName,apiUrl,apiKey[cloudName],secretKey[cloudName],opt);
					tabGroup.activeTab.open(detailWin,{animated:true});
				}
				else{
					alert("Please input API KEY & SECRET KEY.");
				}
			}
		});
       	tableView.addEventListener('scroll',function(event){
			var offset = event.contentOffset.y;
			if (offset <= -65.0 && !pulling){
				var t = Ti.UI.create2DMatrix();
				t = t.rotate(-180);
				pulling = true;
				arrow.animate({transform:t,duration:180});
				statusLabel.text = "Release to refresh...";
			}
			else if (pulling && offset > -65.0 && offset < 0){
				pulling = false;
				var t = Ti.UI.create2DMatrix();
				arrow.animate({transform:t,duration:180});
				statusLabel.text = "Pull down to refresh...";
			}
		});

		tableView.addEventListener('scrollEnd',function(event){
			if (pulling && !reloading && event.contentOffset.y <= -65.0){
				reloading = true;
				pulling = false;
				arrow.hide();
				actInd.show();
				statusLabel.text = "Reloading...";
				tableView.setContentInsets({top:60},{animated:true});
				arrow.transform=Ti.UI.create2DMatrix();
				data = myapp.view.beginReloading(data, count, apiUrl, apiKey, secretKey, cmdLists,opt, cloudName);
			
				tableView.setContentInsets({top:0},{animated:true});
				reloading = false;
				statusLabel.text = "Pull down to refresh...";
				actInd.hide();
				arrow.show();
		
				tableView.data = data;
			}
		});  	
  		return view;
 	};
})();