(function() {
	
	myapp.setting = {};
	myapp.setting.createTab = function(){	
		var editBtn = Titanium.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.EDIT
		});
		editBtn.addEventListener('click', function(){
			win.setLeftNavButton(addBtn);
			win.setRightNavButton(doneBtn);
			tableView.editing = true;
		});
		var addBtn = Titanium.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.ADD
		});
		addBtn.addEventListener('click', function(){
			var addCloud = new Array();
			addCloud = cloudOrig.slice(0);
			
			for(var i=addCloud.length-1;i>=0;i--){
				addCloud[i]['hasChild'] = false;
				for(var j=0;j<cloud.length;j++){
					if(addCloud[i]['title'] === cloud[j]['title']){
						addCloud.splice(i,1);
						break;
					}
				}
			}
			addCloud.push({title:"Input New CloudStack", hasDetail:true, height:Ti.UI.FILL});
			
			var addTableView = Ti.UI.createTableView({
				hasEditing:true,
				hasEditable:true,
				data:addCloud
			});
			addTableView.addEventListener('click', function(e){
				if(e.index === addCloud.length-1){	
					var newScrollView = Titanium.UI.createScrollView({
    					contentWidth:'auto',
    					contentHeight:'auto',
    					top:0,
    					showVerticalScrollIndicator:true
					});
					var newWin = Ti.UI.createWindow({ 
						barColor:'black', 
    					title:'New CloudStack',
					});
					newWin.addEventListener('close', function(){
						addCloud.splice(addCloud.length-1, 0, newCloud);
						addTableView.setData(addCloud);
					});		

					var newL1 = Ti.UI.createLabel({
						text:'Name',
						top:30,
						left:10,
						height:20,
						width:300,
						font:{fontSize:15, fontWeight:'bold'},
						textAlign:'left',
						color:'white'
					});
					newScrollView.add(newL1);

					var newTf1 = Ti.UI.createTextField({
						value:'',
						color:'#888',
						editable: true,
						top:55,
						left:10,
						height:30,
						width:300,
						font:{fontSize:15, fontWeight:'bold'},
						textAlign:'left',
						autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
						keyboardType:Ti.UI.KEYBOARD_DEFAULT,
						returnKeyType:Ti.UI.RETURNKEY_DONE,
						borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
						borderWidth:2,
						borderColor:'#bbb',
						borderRadius:5,
						suppressReturn:false
					});
					newTf1.addEventListener('return',function(){
    					newTf1.blur();
					});
					newTf1.addEventListener('blur',function(){
						if(!newTf1.value){
							newTf1.value = "";
						}
						if(!newTa2.value){
							newTa2.value = "";
						}
						newCloud = {title:newTf1.value.replace(/\n/g,""), img:"", url:newTa2.value.replace(/\n/g,""), height:Ti.UI.FILL};
					});
					newScrollView.add(newTf1);
			
					var newL2 = Ti.UI.createLabel({
						text:'API URL(ex:http://foobar.com/client/api)',
						top:95,
						left:10,
						height:20,
						width:300,
						font:{fontSize:15, fontWeight:'bold'},
						textAlign:'left',
						color:'white'
					});
					newScrollView.add(newL2);

					var newTa2 = Ti.UI.createTextArea({
						value:'',
						color:'#888',
						editable: true,
						top:120,
						left:10,
						height:90,
						width:300,
						font:{fontSize:15, fontWeight:'bold'},
						textAlign:'left',
						autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
						keyboardType:Ti.UI.KEYBOARD_DEFAULT,
						returnKeyType:Ti.UI.RETURNKEY_DONE,
						borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
						borderWidth:2,
						borderColor:'#bbb',
						borderRadius:5,
						suppressReturn:false
					});
					newTa2.addEventListener('return',function(){
    					newTa2.blur();
					});
					newTa2.addEventListener('blur',function(){
						if(!newTf1.value){
							newTf1.value = "";
						}
						if(!newTa2.value){
							newTa2.value = "";
						}
						newCloud = {title:newTf1.value.replace(/\n/g,""), img:"", url:newTa2.value.replace(/\n/g,""), height:Ti.UI.FILL};
					});
					newScrollView.add(newTa2);
					newWin.add(newScrollView);
					tabGroup.activeTab.open(newWin,{animated:true});
				}
				else{
					if(addCloud[e.index]['hasCheck']){
						addCloud[e.index]['hasCheck'] = false;
					}
					else{
						addCloud[e.index]['hasCheck'] = true;
					}		
					addTableView.setData(addCloud);
				}
			});
			
			var win = Ti.UI.createWindow({
				barColor:'black', 
    			title:'Add Cloud'
			});
			win.add(addTableView);
			tabGroup.activeTab.open(win);

			win.addEventListener('close', function(e){
				for(var i=0;i<addCloud.length;i++){
					if(addCloud[i]['hasCheck']){
						addCloud[i]['hasCheck'] = false;
						addCloud[i]['hasChild'] = true;
						cloud.push(addCloud[i]);
					}
				}
				tableView.setData(cloud);
			});

		});

		var doneBtn = Titanium.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.DONE
		});
		doneBtn.addEventListener('click', function(){
			win.setLeftNavButton(infoBtn);
			win.setRightNavButton(editBtn);
			tableView.editing = false;
			Ti.App.Properties.setString('cloud', JSON.stringify(cloud));
			viewArray = new Array();
			for(var i=0;i<cloud.length;i++){
				cloud[i]['hasChild'] = true;
				viewArray[i] = myapp.view.createView(cloud[i]['title'],cloud[i]['img'],cloud[i]['url'],opt);			
			}
			tableView.setData(cloud);
			
			activeView = viewArray[0];
			scrollView.setViews(viewArray);
			cloudWin.remove(scrollView);
			cloudWin.add(scrollView);
		});
		
		var apiKey = new Object(); 
		var secretKey = new Object();
		var infoBtn = Ti.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.INFO_LIGHT,
			height:11,
			width:16
		});
		infoBtn.addEventListener('click', function(){
			var win = Ti.UI.createWindow({ 
				barColor:'black', 
    			title:'Info',
			});
			var webView = Ti.UI.createWebView({
				html:'<html><body style="font-size:24;font-weight:bold;font-family:Helvetica Neue;text-align:center;"><div style="color:white;">App for CloudStack API<br>' + Ti.App.version + '<br><br><a href="http://twitter.com/CS_API_App" target="_blank">@CS_API_App</a><br><a href="http://twitter.com/shugonumano" target="_blank">@shugonumano</a><br><br><a href="https://github.com/snumano/CloudStack-API-iPhone-App" target="_blank">github</a></div></body></html>',
				backgroundColor:'black',
			});
			win.add(webView);
			tabGroup.activeTab.open(win,{animated:true});
			
		});
		
		var tableView = Ti.UI.createTableView({
			data:cloud,
			moveable:true
		});
		
		var win = Ti.UI.createWindow({  
    		title:'Setting',
    		barColor:'black',
    		leftNavButton:infoBtn,
    		rightNavButton:editBtn
		});
		
		var tab = Ti.UI.createTab({  
			title:'Setting',
    		icon:'img/light_wrench.png',
    		window:win
		});
		tableView.addEventListener('move',function(e){
			//Ti.API.info("move - row="+e.row+", index="+e.index+", section="+e.section+", from = "+e.fromIndex);
			var tmp = cloud[e.index];
			cloud[e.index] = cloud[e.fromIndex];
			cloud[e.fromIndex] = tmp;
		});
		tableView.addEventListener('delete',function(e){
			//Ti.API.info("move - row="+e.row+", index="+e.index+", section="+e.section+", from = "+e.fromIndex);
			cloud.splice(e.index,1);
		});
		tableView.addEventListener('click', function(e){			
			cloudName = cloud[e.index]['title'];
			
			var scrollView = Titanium.UI.createScrollView({
    			contentWidth:'auto',
    			contentHeight:'auto',
    			top:0,
    			showVerticalScrollIndicator:true
			});
		
			var detailWin = Ti.UI.createWindow({
				title: cloudName,
				backgroundColor: 'black',
				barColor:'black'
			});
		
			var l1 = Ti.UI.createLabel({
				text:'API KEY',
				top:10,
				left:10,
				height:20,
				width:300,
				font:{fontSize:15, fontWeight:'bold'},
				textAlign:'left',
				color:'white'
			});
			scrollView.add(l1);

			var ta1 = Ti.UI.createTextArea({
				value:'',
				color:'#888',
				editable: true,
				top:30,
				left:10,
				height:90,
				width:300,
				font:{fontSize:15, fontWeight:'bold'},
				textAlign:'left',
				autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
				keyboardType:Ti.UI.KEYBOARD_DEFAULT,
				returnKeyType:Ti.UI.RETURNKEY_DONE,
				borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				borderWidth:2,
				borderColor:'#bbb',
				borderRadius:5,
				suppressReturn:false
			});
		
			ta1.addEventListener('return',function(){
    			ta1.blur();
			});
			ta1.addEventListener('blur',function(){
    			apiKey[cloudName] = ta1.value.replace(/\s|\n/g,"");
    			Ti.App.Properties.setString('apiKey', JSON.stringify(apiKey));
			});
			scrollView.add(ta1);
		
			var l2 = Ti.UI.createLabel({
				text:'SECRET KEY',
				top:130,
				left:10,
				height:20,
				width:300,
				font:{fontSize:15, fontWeight:'bold'},
				textAlign:'left',
				color:'white'
			});
			scrollView.add(l2);

			var ta2 = Ti.UI.createTextArea({
				value:'',
				color:'#888',
				editable: true,
				top:150,
				left:10,
				height:90,
				width:300,
				font:{fontSize:15, fontWeight:'bold'},
				textAlign:'left',
				autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
				keyboardType:Ti.UI.KEYBOARD_DEFAULT,
				returnKeyType:Ti.UI.RETURNKEY_DONE,
				borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				borderWidth:2,
				borderColor:'#bbb',
				borderRadius:5,
				suppressReturn:false
			});
			ta2.addEventListener('return',function(){
    			ta2.blur();
			});
			ta2.addEventListener('blur',function(){
    			secretKey[cloudName] = ta2.value.replace(/\s|\n/g,"");
	    		Ti.App.Properties.setString('secretKey', JSON.stringify(secretKey));
			});		
			scrollView.add(ta2);

			ta1.value = apiKey[cloudName];
			ta2.value = secretKey[cloudName];
			
    		detailWin.add(scrollView);
			tabGroup.activeTab.open(detailWin,{animated:true});
		});

		win.addEventListener('close', function(){
			Ti.App.Properties.setString('apiKey',JSON.stringify(apiKey));
			Ti.App.Properties.setString('secretKey',JSON.stringify(secretKey));
		});

		win.addEventListener('open', function(){					
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
		});
		
		win.add(tableView);
		return tab;	
	};
})();