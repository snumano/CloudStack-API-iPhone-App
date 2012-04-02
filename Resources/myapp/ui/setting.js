(function() {
	myapp.setting = {};
	
	myapp.setting.createTab = function(){	
		var i = 0;	

		var apiKey = new Array(); 
		var secretKey = new Array();

		var infoBtn = Ti.UI.createButton({
			backgroundImage:"img/light_info.png",
			height:11,
			width:16
		});
		
		var scrollView = Titanium.UI.createScrollView({
    		contentWidth:'auto',
    		contentHeight:'auto',
    		top:0,
    		showVerticalScrollIndicator:true
		});
		
		var win = Ti.UI.createWindow({  
    		title:'Setting',
    		rightNavButton:infoBtn
		});
		
		var tab = Ti.UI.createTab({  
    		icon:'img/light_wrench.png',
    		window:win
		});

		infoBtn.addEventListener('click', function(){
			var win = Ti.UI.createWindow({  
    			title:'Info',
			});
		
			var label = Ti.UI.createLabel({
				text:'DEMO for CloudStack API\n\n@CS_API_App\n@shugonumano\n\nhttps://github.com/snumano/CloudStack-API-iPhone-App',
				font:{fontSize:15, fontWeight:'bold'},
				textAlign:'center',
				color:'#fff'
			});
			win.add(label);
		
			tab.open(win,{animated:true});
			
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
		
			ta1.value = apiKey[i];
			ta2.value = secretKey[i];	
		});

		var transformPicker = Ti.UI.create2DMatrix().scale(0.7);
		var picker = Ti.UI.createPicker({
			top:-30,
			transform:transformPicker
		});
		
		var data = [
			{title:'Tata'},
			{title:'NineFold'},
			{title:'Datapipe'},
//			{title:'NTTCom'},
//			{title:'IDC'}
		];

		picker.selectionIndicator = true;
		picker.add(data);
		scrollView.add(picker);
		picker.setSelectedRow(0,1,true);

			
		picker.addEventListener('change',function(e){
			if(Ti.App.Properties.getString('apiKey')){
				apiKey = JSON.parse(Ti.App.Properties.getString('apiKey'));
			}
			if(Ti.App.Properties.getString('secretKey')){
				secretKey = JSON.parse(Ti.App.Properties.getString('secretKey'));
			}
			
			//Ti.API.info("You selected row: " + e.rowIndex + " URL:" + e.row.apiUrl);
			//Ti.API.info("0:" + apiKey[0] + ",1:" + apiKey[1] + ",2:" + apiKey[2] +",3:" + apiKey[3] + ",4:" + apiKey[4]);
			//Ti.API.info("0:" + secretKey[0] + ",1:" + secretKey[1] + ",2:" + secretKey[2] + ",3:" + secretKey[3]+ ",4:" + secretKey[4]);

			i = e.rowIndex;
			ta1.value = apiKey[i];
			ta2.value = secretKey[i];
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
			color:'#fff'
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
		
		ta1.addEventListener('return',function(e){
    		ta1.blur();
		});
		ta1.addEventListener('blur',function(e){
    		apiKey[i] = ta1.value.replace(/\s|\n/g,"");
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
			color:'#fff'
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
		ta2.addEventListener('return',function(e){
    		ta2.blur();
		});
		ta2.addEventListener('blur',function(e){
    		secretKey[i] = ta2.value.replace(/\s|\n/g,"");
    		Ti.App.Properties.setString('secretKey', JSON.stringify(secretKey));
    		scrollView.scrollTo(0,0);
		});		
		scrollView.add(ta2);
		win.add(scrollView);
		
		return tab;	
	};
})();