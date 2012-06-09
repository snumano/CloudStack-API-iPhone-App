(function() {
	myapp.view = {};
	myapp.cmd = {};
	Titanium.include("../subroutine.js");
	Titanium.include("vm.js");
	Titanium.include("volume.js");
		
	myapp.view.beginReloading = function(data, count, apiUrl, apiKey, secretKey, cmdType, opt, cloudName){
		if(!apiKey || !secretKey || !apiKey[cloudName] || !secretKey[cloudName]){
			for(var cmd in cmdLists){
				count[cmd] = 'NA';
			}
		}
		else{	
			for(var cmd in cmdLists){	
				var url = myapp.sub.getUrl(apiUrl,apiKey[cloudName],secretKey[cloudName],cmdLists[cmd]['list'],opt);
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
  				xhr.onerror = function(e){
       				//alert(e);
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
			data = myapp.view.beginReloading(data, count, apiUrl, apiKey, secretKey, 'ALL',opt, cloudName);
			tableView.data = data;
		});
		
		var view = Ti.UI.createView();
		var r = myapp.sub.makeTableHeader();		
		var pulling = false;
		var reloading = false;
    	var tableView =Ti.UI.createTableView({
      		data:data
    	});
	
		tableView.headerPullView = r.tableHeader;		
		view.add(tableView);
		apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
		secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
		data = myapp.view.beginReloading(data, count, apiUrl, apiKey, secretKey, 'ALL',opt, cloudName);
		tableView.data = data;
			
		tableView.addEventListener('click', function(e){
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
			
    		if(e.rowData.title.match(/VM/)){
  				if(apiKey[cloudName] && secretKey[cloudName]){
					var detailWin = myapp.cmd.vm.createWin(cloudName,apiUrl,apiKey[cloudName],secretKey[cloudName],opt);
					tabGroup.activeTab.open(detailWin,{animated:true});
				}
				else{
					alert("Please input API KEY & SECRET KEY.");
				}
			}
			else if(e.rowData.title.match(/VOLUME/)){
				if(apiKey[cloudName] && secretKey[cloudName]){
					var detailWin = myapp.cmd.volume.createWin(cloudName,apiUrl,apiKey[cloudName],secretKey[cloudName],opt);
					tabGroup.activeTab.open(detailWin,{animated:true});
				}
				else{
					alert("Please input API KEY & SECRET KEY.");
				}
			}
		});
       	tableView.addEventListener('scroll',function(e){
			var offset = e.contentOffset.y;
			if (offset <= -65.0 && !pulling){
				var t = Ti.UI.create2DMatrix();
				t = t.rotate(-180);
				pulling = true;
				r.arrow.animate({transform:t,duration:180});
				r.statusLabel.text = "Release to refresh...";
			}
			else if (pulling && offset > -65.0 && offset < 0){
				pulling = false;
				var t = Ti.UI.create2DMatrix();
				r.arrow.animate({transform:t,duration:180});
				r.statusLabel.text = "Pull down to refresh...";
			}
		});

		tableView.addEventListener('scrollEnd',function(e){
			if (pulling && !reloading && e.contentOffset.y <= -65.0){
				reloading = true;
				pulling = false;
				r.arrow.hide();
				r.actInd.show();
				r.statusLabel.text = "Reloading...";
				tableView.setContentInsets({top:60},{animated:true});
				r.arrow.transform=Ti.UI.create2DMatrix();
				data = myapp.view.beginReloading(data, count, apiUrl, apiKey, secretKey, 'ALL', opt, cloudName);
			
				tableView.setContentInsets({top:0},{animated:true});
				reloading = false;
				r.statusLabel.text = "Pull down to refresh...";
				r.actInd.hide();
				r.arrow.show();
		
				tableView.data = data;
			}
		});  	
  		return view;
 	};
})();