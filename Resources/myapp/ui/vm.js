(function() {
	myapp.tab.vm = {};
	
	myapp.tab.vm.createWin = function(cloudName,apiUrl,apiKey,secretKey,opt,tab,img){
		var cmd = "listVirtualMachines";

		var btn = Ti.UI.createButton({
			backgroundImage:img,
			height:11,
			width:16
		});
		btn.addEventListener('click', function(){
			alert("Not implemented yet.");
		});
		
		var win = Ti.UI.createWindow({  
    		title:cloudName + ':VM',
    		backgroundColor:'#fff',
    		rightNavButton:btn
		});
		
		var url = myapp.getUrl(apiUrl,apiKey,secretKey,cmd,opt);
		
  		// オブジェクトを生成します。
  		var xhr = Ti.Network.createHTTPClient();
  		xhr.open('GET', url);
  		// データダウンロード時のイベント処理
  		xhr.onload = function() {
    		// JSONパース
    		var json = JSON.parse(this.responseText);
    		Ti.API.info(json);

			var data =[];
    		for (var i=0; i<json.listvirtualmachinesresponse.virtualmachine.length;i++) {
      			var info = json.listvirtualmachinesresponse.virtualmachine[i];
 
      			// ここからCellを生成する
      			var labelId = Ti.UI.createLabel({
        			text:info.id,
        			font:{fontSize:15,fontWeight:'bold'}, textAlign:'left',
        			color:'#000',top:0, left:3, width:55
        		});
      			// ラベルを生成
      			var labelDisplayName = Ti.UI.createLabel({
        			text:info.displayname,
        			font:{fontSize:15,fontWeight:'bold'}, textAlign:'left',
        			color:'#000',top:0, left:60, width:100
      			});
      			// ラベルを生成
      			var labelTemplateName = Ti.UI.createLabel({
        			text:info.templatename,
        			font:{fontSize:10}, textAlign:'left',
        			color:'#000',top:0, left:165, width:'auto'
      			});
      			// Cellのクラス名と高さを定義
      			var row = Ti.UI.createTableViewRow({
        			className:"NomalCell",
        			height:60
      			});
 
      			// RowにLabelオブジェクトの追加
      			row.add(labelId);
      			row.add(labelDisplayName);
      			row.add(labelTemplateName);
      			row.setHasChild(true);
      			data.push(row);
    		}
 
    		// TableViewの作成
    		var tableView =Ti.UI.createTableView({
      			data:data,
      			editable:true
    		});   		
    		win.add(tableView);
       		
			tableView.addEventListener('delete', function(event){
				alert("Not implemented yet.\nNot deleted.");
			});
				
		    tableView.addEventListener('click', function(event){
    			//alert(json.listvirtualmachinesresponse.virtualmachine[event.index].id);
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
					backgroundColor: '#fff'
				});
		
				detailWin.add(detailLabel);
				tab.open(detailWin);
			});
  		};
  		// HTTPリクエストの送信
  		xhr.send();
  		
  		xhr.onerror = function(error){
        	alert("No Internet connection.Please make sure that you have Internet connectivity and try again later.");
       };
  		
  		return win;
 	};
})();

