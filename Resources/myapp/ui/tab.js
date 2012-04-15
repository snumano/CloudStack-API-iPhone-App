(function() {
	myapp.tab = {};
	Titanium.include("../subroutine.js");
	Titanium.include("vm.js");
	Titanium.include("volume.js");
	
	myapp.tab.createTab = function(num,cloudName,flag,apiUrl,opt,img){
		var apiKey = new Array(); 
		var secretKey = new Array();
		var cmdLists = {
			'VM':'listVirtualMachines', 
			'VOLUME':'listVolumes'
			};
		var count = new Object();
	
		var btn = Ti.UI.createButton({
			backgroundImage:flag,
			height:22,
			width:32
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
			
			beginReloading();
		});
		
		var tab = Ti.UI.createTab({  
    		icon:'img/light_globe.png',
    		title:cloudName,
    		window:win
		});
		
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

		var lastUpdatedLabel = Ti.UI.createLabel({
			text:"Last Updated: ",
			left:55,
			width:200,
			bottom:15,
			height:"auto",
			color:"#576c89",
			textAlign:"center",
			font:{fontSize:12},
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

		function beginReloading(){
			data[0].title = 'VM(' + count['VM'] +')';
			data[1].title = 'VOLUME(' + count['VOLUME'] +')';
		
			tableView.data = data;
			setTimeout(endReloading,2000);
		}

		function endReloading(){

			// when you're done, just reset
			tableView.setContentInsets({top:0},{animated:true});
			reloading = false;
			lastUpdatedLabel.text = "Last Updated: ";
			statusLabel.text = "Pull down to refresh...";
			actInd.hide();
			arrow.show();
		}

		
		apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
		secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
				
//		if(!apiKey || !secretKey || !apiKey[num] || !secretKey[num]){
		if(!apiKey || !secretKey ){
			alert("Please input API KEY & SECRET KEY.");
		}
		else if(!apiKey[num] || !secretKey[num]){
			//Ti.API.info(num);
			//Ti.API.info(apiUrl);
			//Ti.API.info(apiKey);
			//Ti.API.info(secretKey);
			//Ti.API.info(cmdLists[cmd]);
			//Ti.API.info(opt);
			for(var cmd in cmdLists){
				count[cmd] = 'NA';
			}
		}
		else{
			for(var cmd in cmdLists){			
				//Ti.API.info(num);
				//i.API.info(apiUrl);
				//Ti.API.info(apiKey);
				//Ti.API.info(secretKey);
				//Ti.API.info(cmdLists[cmd]);
				//Ti.API.info(opt);

				var url = myapp.sub.getUrl(apiUrl,apiKey[num],secretKey[num],cmdLists[cmd],opt);

				Ti.API.info(url);
				//Ti.API.info("CMD:" + cmdLists[cmd]);				
  				// オブジェクトを生成します。
  				var xhr = Ti.Network.createHTTPClient();
  				xhr.open('GET', url, false);

  				// データダウンロード時のイベント処理
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
    				
    				//Ti.API.info('COUNT OBJ:');
    				//Ti.API.info(count);
				};
				
  				xhr.onerror = function(error){
        			alert("No Internet connection.Please make sure that you have Internet connectivity and try again later.");
       			};
       			
       			// HTTPリクエストの送信
  				xhr.send();
			}
		}

		
		var data = [
			{title:'VM(' + count['VM'] +')', hasChild:true, leftImage:'img/Crystal_Clear_app_network_local.png'},
			{title:'VOLUME(' + count['VOLUME'] +')', hasChild:true, leftImage:'img/Crystal_Clear_app_database.png'}
		];
		
		// TableViewの作成
    	var tableView =Ti.UI.createTableView({
      		data:data
    	});

		tableView.headerPullView = tableHeader;			
    	win.add(tableView);

		tableView.addEventListener('click', function(event){
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
			
			Ti.API.info(event.rowData.title);
    		if(event.rowData.title.match(/VM/)){
  				if(apiKey[num] && secretKey[num]){
					var detailWin = myapp.tab.vm.createWin(cloudName,apiUrl,apiKey[num],secretKey[num],opt,tab,img);
					tab.open(detailWin);
				}
				else{
					alert("Please input API KEY & SECRET KEY.");
				}
			}
			else if(event.rowData.title.match(/VOLUME/)){
				if(apiKey[num] && secretKey[num]){
					var detailWin = myapp.tab.volume.createWin(cloudName,apiUrl,apiKey[num],secretKey[num],opt,tab,img);
					tab.open(detailWin);
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

		tableView.addEventListener('scrollEnd',function(e){
			if (pulling && !reloading && e.contentOffset.y <= -65.0){
				reloading = true;
				pulling = false;
				arrow.hide();
				actInd.show();
				statusLabel.text = "Reloading...";
				tableView.setContentInsets({top:60},{animated:true});
				arrow.transform=Ti.UI.create2DMatrix();
				beginReloading();
			}
		});
       	
  		return tab;
 	};
})();

