(function() {
	myapp.tab.vm = {};
	Titanium.include("../subroutine.js");
	
	myapp.tab.vm.createWin = function(cloudName,apiUrl,apiKey,secretKey,opt){
		var cmd = "listVirtualMachines";
		var idZone;
		var nameZone;

		var addBtn = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.ADD
		});
		addBtn.addEventListener('click', function(){
			var list = [];
			var cmd = "listZones";
			var url = myapp.sub.getUrl(apiUrl,apiKey,secretKey,cmd,opt);
			var json;
			
	  		var xhr = Ti.Network.createHTTPClient();
  			xhr.open('GET', url, false);
  			xhr.onload = function() {
    			json = JSON.parse(this.responseText);
				
				var j=0;
    			for (var i=0; i<json.listzonesresponse.zone.length;i++) {
    				if((url.match(/datapipe\.com/) && json.listzonesresponse.zone[i].securitygroupsenabled) || !url.match(/datapipe\.com/)){
	      				list[j] = i;
	      				j++;
	      			}
				} 
				
				var w1 = Titanium.UI.createWindow({
					backgroundColor:'black',
					title:'Select Zone',
					barColor:'black',
				});
				var cancelBtn = Titanium.UI.createButton({
					systemButton:Titanium.UI.iPhone.SystemButton.CANCEL
				});

				w1.setLeftNavButton(cancelBtn);
				cancelBtn.addEventListener('click',function(){
					w1.close();
				});
			
				var nextBtn = Titanium.UI.createButton({
					title:'Next',
					width:100,
					height:40,
					top:300
				});
				nextBtn.addEventListener('click', function(){
					var list = [];
					var cmd = "listTemplates";
					var opt2 = opt + "&templatefilter=featured&zoneid=" + idZone;
					var url = myapp.sub.getUrl(apiUrl,apiKey,secretKey,cmd,opt2);
					var json;
					var idTemplate;
					var nameTemplate;
					
	  				var xhr = Ti.Network.createHTTPClient();
  					xhr.open('GET', url, false);
  					xhr.onload = function() {
    					json = JSON.parse(this.responseText);
						var w2 = Titanium.UI.createWindow({
							backgroundColor:'black',
							title:'Select Template',
							barColor:'black',
						});
			
						var nextBtn = Titanium.UI.createButton({
							title:'Next',
							width:100,
							height:40,
							top:300
						});
						nextBtn.addEventListener('click', function(){
							var list = [];
							var cmd = "listServiceOfferings";
							var url = myapp.sub.getUrl(apiUrl,apiKey,secretKey,cmd,opt);
							var json;
							var idServiceOffering;
							var nameServiceOffering;
			
	  						var xhr = Ti.Network.createHTTPClient();
  							xhr.open('GET', url, false);
  							xhr.onload = function() {
    							json = JSON.parse(this.responseText);
								//Ti.API.info(json);
								var w3 = Titanium.UI.createWindow({
									backgroundColor:'black',
									title:'Select ServiceOffering',
									barColor:'black',
								});
			
								var nextBtn = Titanium.UI.createButton({
									title:'Next',
									width:100,
									height:40,
									top:300
								});
								nextBtn.addEventListener('click', function(){
									var related;
									var w4 = Ti.UI.createWindow({ 
										backgroundColor:'black',
										title:'Confirmation',
										barColor:'black', 
									});
		
									var label1 = Ti.UI.createLabel({
										text:nameZone,
										font:{fontSize:20, fontWeight:'bold'},
										textAlign:'center',
										color:'white',
										top:30,
										height:'auto',
										width:'auto'
									});
									w4.add(label1);
									
									var label2 = Ti.UI.createLabel({
										text:nameTemplate,
										font:{fontSize:20, fontWeight:'bold'},
										textAlign:'center',
										color:'white',
										top:90,
										height:'auto',
										width:'auto'
									});
									w4.add(label2);
									
									var label3 = Ti.UI.createLabel({
										text:nameServiceOffering,
										font:{fontSize:20, fontWeight:'bold'},
										textAlign:'center',
										color:'white',
										top:150,
										height:'auto',
										width:'auto'
									});
									w4.add(label3);

									var deployBtn = Titanium.UI.createButton({
										title:'Deploy',
										width:100,
										height:40,
										top:300
									});
									deployBtn.addEventListener('click', function(){
										var winArray = [w4,w3,w2,w1];
										if(apiUrl.match(/tatacommunications\.com/)){
											var cmd = "listNetworks";
											var url = myapp.sub.getUrl(apiUrl,apiKey,secretKey,cmd,opt);
											var json;
											
		 									var xhr = Ti.Network.createHTTPClient();
  											xhr.open('GET', url, false);
  											xhr.onload = function() {
    											json = JSON.parse(this.responseText);
    											related = String(json.listnetworksresponse.network[0].related);
  
  	  											var opt2 = opt + '&serviceofferingid=' + idServiceOffering + '&templateid=' + idTemplate + '&zoneid=' + idZone + '&networkIds=' + related;
	  											myapp.tab.vm.deployWin(apiUrl,apiKey,secretKey,opt2,tab,winArray);				
											}
		  									xhr.onerror = function(event){
    		    								alert(event);
       										};		
	  										xhr.send();	
										}
										else{
											var opt2 = opt + '&serviceofferingid=' + idServiceOffering + '&templateid=' + idTemplate + '&zoneid=' + idZone;
	  										myapp.tab.vm.deployWin(apiUrl,apiKey,secretKey,opt2,tab,winArray);			
										}								
									});
									w4.add(deployBtn);
									tabGroup.activeTab.open(w4,{animated:true});
								});
								w3.add(nextBtn);

								var picker = Ti.UI.createPicker();
								var data = [];
								for(var i=0;i<json.listserviceofferingsresponse.count;i++){
									data[i]=Ti.UI.createPickerRow({title:json.listserviceofferingsresponse.serviceoffering[i].name});
								}
			
								picker.selectionIndicator = true;
								picker.add(data);
								w3.add(picker);
								picker.setSelectedRow(0,1,true);
								idServiceOffering = json.listserviceofferingsresponse.serviceoffering[0].id;
								nameServiceOffering = json.listserviceofferingsresponse.serviceoffering[0].name;
				
								picker.addEventListener('change',function(event){
									idServiceOffering = json.listserviceofferingsresponse.serviceoffering[event.rowIndex].id;
									nameServiceOffering = json.listserviceofferingsresponse.serviceoffering[event.rowIndex].name;
								});
								tabGroup.activeTab.open(w3,{animated:true});
    						}
	  						xhr.onerror = function(event){
    	    					alert(event);
       						};		
	  						xhr.send();			
						});
						w2.add(nextBtn);

						var picker = Ti.UI.createPicker();
						var data = [];
						for(var i=0;i<json.listtemplatesresponse.count;i++){
							data[i]=Ti.UI.createPickerRow({title:json.listtemplatesresponse.template[i].name});
						}
			
						picker.selectionIndicator = true;
						picker.add(data);
						w2.add(picker);
						picker.setSelectedRow(0,1,true);
						idTemplate = json.listtemplatesresponse.template[0].id;
						nameTemplate = json.listtemplatesresponse.template[0].name;
				
						picker.addEventListener('change',function(event){
							idTemplate = json.listtemplatesresponse.template[event.rowIndex].id;
							nameTemplate = json.listtemplatesresponse.template[event.rowIndex].name;
						});
						tabGroup.activeTab.open(w2,{animated:true});
    				}
	  				xhr.onerror = function(event){
    	    			alert(event);
       				};		
	  				xhr.send();
				});
				w1.add(nextBtn);
			
				var picker = Ti.UI.createPicker();
				var data = [];
				for(var i=0;i<j;i++){
					data[i]=Ti.UI.createPickerRow({title:json.listzonesresponse.zone[list[i]].name});
				}
			
				picker.selectionIndicator = true;
				picker.add(data);
				w1.add(picker);
				picker.setSelectedRow(0,1,true);
				idZone = json.listzonesresponse.zone[list[0]].id;
				nameZone = json.listzonesresponse.zone[list[0]].name;
				
				picker.addEventListener('change',function(event){
					idZone = json.listzonesresponse.zone[list[event.rowIndex]].id;
					nameZone = json.listzonesresponse.zone[list[event.rowIndex]].name;
				});
				tabGroup.activeTab.open(w1,{animated:true});
    		}
	  		xhr.onerror = function(event){
    	    	alert(event);
       		};
       		
  			xhr.send();
		});
		
		var win = Ti.UI.createWindow({  
    		title:cloudName + ':VM',
    		backgroundColor:'white',
    		barColor:'black',
    		rightNavButton:addBtn
		});
		
		var url = myapp.sub.getUrl(apiUrl,apiKey,secretKey,cmd,opt);
		
  		var xhr = Ti.Network.createHTTPClient();
  		xhr.open('GET', url);
  		xhr.onload = function() {
    		var json = JSON.parse(this.responseText);
			var data =[];
    		for (var i=0; i<json.listvirtualmachinesresponse.virtualmachine.length;i++) {
      			var info = json.listvirtualmachinesresponse.virtualmachine[i];
 
 				if(info.state.match(/Running/)){
 					imgCircle = 'img/circle_blue.png';
 				}
 				else if(info.state.match(/Stopped/)){
 					imgCircle = 'img/circle_red.png';
 				}
 				else if(info.state.match(/Destroyed/)){
 					imgCircle = 'img/circle_gray.png';
 				}
 				else{
 					imgCircle = 'img/circle_yellow.png';
 				}

      			var circle = Ti.UI.createImageView({
      				image:imgCircle,
      				left:3,
      				height:30,
      				width:30
      			});      			
      			var labelId = Ti.UI.createLabel({
        			text:info.id,
        			font:{fontSize:10,fontWeight:'bold'}, textAlign:'left',
        			color:'#000',top:0, height:60, left:35, width:45
        		});
      			var labelDisplayName = Ti.UI.createLabel({
        			text:info.displayname,
        			font:{fontSize:10,fontWeight:'bold'}, textAlign:'left',
        			color:'#000',top:0, height:60, left:85, width:80
      			});
      			var labelTemplateName = Ti.UI.createLabel({
        			text:info.templatename,
        			font:{fontSize:10}, textAlign:'left',
        			color:'#000',top:0, height:60, left:170, width:'auto'
      			});
      			var row = Ti.UI.createTableViewRow({
        			className:"NomalCell",
        			height:60
      			});
 
 				row.add(circle);
      			row.add(labelId);
      			row.add(labelDisplayName);
      			row.add(labelTemplateName);
      			row.setHasChild(true);
      			data.push(row);
    		}
 
    		var tableView =Ti.UI.createTableView({
      			data:data,
      			editable:true
    		});   		
    		win.add(tableView);
       		
			tableView.addEventListener('delete', function(event){
				var cmd = "destroyVirtualMachine";
				var opt2 = opt + '&id=' + Number(json.listvirtualmachinesresponse.virtualmachine[event.index].id);
				var url = myapp.sub.getUrl(apiUrl,apiKey,secretKey,cmd,opt2);
				var json2;
										
	  			var xhr = Ti.Network.createHTTPClient();
  				xhr.open('GET', url, false);
  				xhr.onload = function() {
    				json2 = JSON.parse(this.responseText);
					alert("VM ID:" + json.listvirtualmachinesresponse.virtualmachine[event.index].id + " has been destroyed.");
    			}
	  			xhr.onerror = function(event){
    	    		alert(event);
       			};		
	  			xhr.send();	
			});
				
		    tableView.addEventListener('click', function(event){
    			var detailLabel = Ti.UI.createLabel({
					color:'#999',
					text:"id:" + json.listvirtualmachinesresponse.virtualmachine[event.index].id + "\n" +
						"name:" + json.listvirtualmachinesresponse.virtualmachine[event.index].name + "\n" +
						"hostname:" + json.listvirtualmachinesresponse.virtualmachine[event.index].hostname + "\n" +
						"displayname:" + json.listvirtualmachinesresponse.virtualmachine[event.index].displayname + "\n" +
						"group:" + json.listvirtualmachinesresponse.virtualmachine[event.index].group + "\n" +
						"state:" + json.listvirtualmachinesresponse.virtualmachine[event.index].state + "\n" +
						"templatename:" + json.listvirtualmachinesresponse.virtualmachine[event.index].templatename + "\n" +
						"cpunumber:" + json.listvirtualmachinesresponse.virtualmachine[event.index].cpunumber + "\n" +
						"cpuspeed:" + json.listvirtualmachinesresponse.virtualmachine[event.index].cpuspeed + "\n" +
						"memory:" + json.listvirtualmachinesresponse.virtualmachine[event.index].memory + "\n" +
						"zonename:" + json.listvirtualmachinesresponse.virtualmachine[event.index].zonename,
					font:{fontSize:14,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top:10,
					left:5,
					height:'auto',
					width:'auto'
				});
				
				var detailWin = Ti.UI.createWindow({
					title: cloudName + ':VM:' + json.listvirtualmachinesresponse.virtualmachine[event.index].id,
					backgroundColor: 'white',
					barColor:'black'
				});
		
				detailWin.add(detailLabel);
				tabGroup.activeTab.open(detailWin,{animated:true});
			});
  		};
  		xhr.send();
  		xhr.onerror = function(event){
        	alert("No Internet connection.Please make sure that you have Internet connectivity and try again later.");
       	};
  		return win;
 	};
 	
 	myapp.tab.vm.deployWin = function(apiUrl,apiKey,secretKey,opt,tab,winArray){
 		var cmd = "deployVirtualMachine";
		var url = myapp.sub.getUrl(apiUrl,apiKey,secretKey,cmd,opt);
		var json;
										
	  	var xhr = Ti.Network.createHTTPClient();
  		xhr.open('GET', url, false);
  		xhr.onload = function() {
    		json = JSON.parse(this.responseText);
    		//Ti.API.info(json);
						
			var w5 = Ti.UI.createWindow({ 
				backgroundColor:'black',
				title:'Started to deploy',
				barColor:'black', 
			});
			var label1 = Ti.UI.createLabel({
				text:'Please wait a few minutes.',
				font:{fontSize:20, fontWeight:'bold'},
				textAlign:'center',
				color:'white',
				top:30,
				height:'auto',
				width:'auto'
			});
			w5.add(label1);
											
			var okBtn = Titanium.UI.createButton({
				title:'OK',
				width:100,
				height:40,
				top:300
			});
			w5.add(okBtn);
			tabGroup.activeTab.open(w5,{animated:true});

			okBtn.addEventListener('click', function(){
				tabGroup.activeTab.close(w5);
				for(var i=0;i<winArray.length;i++){
					tabGroup.activeTab.close(winArray[i]);
				}
			});
    	}
    									
	  	xhr.onerror = function(event){
    		alert(event);
       	};		
	  	xhr.send();	
 	};
})();