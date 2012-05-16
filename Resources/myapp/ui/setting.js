(function() {
	myapp.setting = {};
	
	myapp.setting.createTab = function(){
		//var i = 0;	
		var cloudName = 'Tata';
		
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
				html:'<html><body style="font-size:15;font-weight:bold;font-family:Helvetica Neue;text-align:center;"><div style="color:white;">App for CloudStack API<br><br><a href="http://twitter.com/CS_API_App" target="_blank">@CS_API_App</a><br><a href="http://twitter.com/shugonumano" target="_blank">@shugonumano</a><br><br><a href="https://github.com/snumano/CloudStack-API-iPhone-App" target="_blank">github</a></div></body></html>',
				backgroundColor:'black',
			});
			win.add(webView);
			tab.open(win,{animated:true});
			
		});
		
		var editBtn = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.EDIT
		});
		editBtn.addEventListener('click', function(){
			var addCloud = new Array();
			
			var editScrollView = Titanium.UI.createScrollView({
    			contentWidth:'auto',
    			contentHeight:'auto',
    			top:0,
    			showVerticalScrollIndicator:true
			});
		
			var editWin = Ti.UI.createWindow({ 
				barColor:'black', 
    			title:'Add Cloud Provider',
			});
			editWin.addEventListener('close', function(){
				Ti.App.Properties.setString('addCloud',JSON.stringify(addCloud));
				//Ti.API.info('close edit');

				if(Ti.App.Properties.getString('addCloud')){
					addCloud = JSON.parse(Ti.App.Properties.getString('addCloud'));
					Ti.API.info(addCloud);
					cloud[countCloud] = addCloud;
				}		
				if(picker.columns[0].rows[countCloud]){
					column.removeRow(picker.columns[0].rows[countCloud]);
				}
				column.addRow(Ti.UI.createPickerRow({title:cloud[countCloud][0]}));
				picker.reloadColumn(column);
				
				if(tabadd){
					tabGroup.removeTab(tabadd);	
				}
				tabadd = myapp.tab.createTab(cloud[countCloud][0],cloud[countCloud][1],cloud[countCloud][2],opt);
				tabGroup.addTab(tabadd);  
				
			});		
			editWin.addEventListener('open', function(){		
				if(Ti.App.Properties.getString('addCloud')){
					addCloud = JSON.parse(Ti.App.Properties.getString('addCloud'));
				}		
				editTf1.value = addCloud[0];
				editTa2.value = addCloud[2];	
			});

			var editL1 = Ti.UI.createLabel({
				text:'Name',
				top:30,
				left:10,
				height:20,
				width:300,
				font:{fontSize:15, fontWeight:'bold'},
				textAlign:'left',
				color:'white'
			});
			editScrollView.add(editL1);

			var editTf1 = Ti.UI.createTextField({
//			var editTf1 = Ti.UI.createTextArea({
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
			editTf1.addEventListener('return',function(){
    			editTf1.blur();
			});
			editTf1.addEventListener('blur',function(){
				if(!editTf1.value){
					editTf1.value = "";
				}
				if(!editTa2.value){
					editTa2.value = "";
				}
				addCloud = [editTf1.value.replace(/\n/g,""),"",editTa2.value.replace(/\n/g,"")];
				Ti.App.Properties.setString('addCloud', JSON.stringify(addCloud));
			});
			editScrollView.add(editTf1);
			
			var editL2 = Ti.UI.createLabel({
				text:'API URL(ex:http://foobar.com/client/api)',
				top:95,
				left:10,
				height:20,
				width:300,
				font:{fontSize:15, fontWeight:'bold'},
				textAlign:'left',
				color:'white'
			});
			editScrollView.add(editL2);

			var editTa2 = Ti.UI.createTextArea({
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
			editTa2.addEventListener('return',function(){
    			editTa2.blur();
			});
			editTa2.addEventListener('blur',function(){
				if(!editTf1.value){
					editTf1.value = "";
				}
				if(!editTa2.value){
					editTa2.value = "";
				}
				addCloud = [editTf1.value.replace(/\n/g,""),"",editTa2.value.replace(/\n/g,"")];
				Ti.App.Properties.setString('addCloud', JSON.stringify(addCloud));
			});
			editScrollView.add(editTa2);
			
			editWin.add(editScrollView);
			tab.open(editWin,{animated:true});
			
		});
				
		var scrollView = Titanium.UI.createScrollView({
    		contentWidth:'auto',
    		contentHeight:'auto',
    		top:0,
    		showVerticalScrollIndicator:true
		});
		
		var win = Ti.UI.createWindow({  
    		title:'Setting',
    		barColor:'black',
    		rightNavButton:infoBtn,
    		leftNavButton:editBtn
		});
		
		var tab = Ti.UI.createTab({  
			title:'Setting',
    		icon:'img/light_wrench.png',
    		window:win
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
			
			ta1.value = apiKey[cloudName];
			ta2.value = secretKey[cloudName];	
		});

		var transformPicker = Ti.UI.create2DMatrix().scale(0.7);
		var picker = Ti.UI.createPicker({
			top:-30,
			transform:transformPicker
		});
		
		if(Ti.App.Properties.getString('addCloud')){
			addCloud = JSON.parse(Ti.App.Properties.getString('addCloud'));
			cloud[countCloud] = addCloud;
		}		
		picker.selectionIndicator = true;
		var column = Ti.UI.createPickerColumn();
		for(var i=0;i<cloud.length;i++){
			column.addRow(Ti.UI.createPickerRow({title:cloud[i][0]}));
		}
		picker.add(column);
		
		scrollView.add(picker);
		picker.setSelectedRow(0,1,true);
			
		picker.addEventListener('change',function(event){
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
			//Ti.API.info('READ:' + apiKey);
			
			//i = event.rowIndex;
			//Ti.API.info(event.selectedValue[0]);
			//Ti.API.info(apiKey[event.selectedValue[0]]);
			cloudName = event.selectedValue[0];
			ta1.value = apiKey[cloudName];
			ta2.value = secretKey[cloudName];
		});

		picker.setSelectedRow(0,1,false);
		
		var l1 = Ti.UI.createLabel({
			text:'API KEY',
			top:180,
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
			top:200,
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
    		Ti.API.info('cloudName:' + cloudName);
    		Ti.API.info('apiKey:' + apiKey[cloudName]);
    		Ti.App.Properties.setString('apiKey', JSON.stringify(apiKey));
    		scrollView.scrollTo(0,0);
		});
		scrollView.add(ta1);
		
		var l2 = Ti.UI.createLabel({
			text:'SECRET KEY',
			top:300,
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
			top:320,
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
    		scrollView.scrollTo(0,0);
		});		
		scrollView.add(ta2);

		win.add(scrollView);
		return tab;	
	};
})();