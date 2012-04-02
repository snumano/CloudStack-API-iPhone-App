(function() {
	myapp.tab.volume = {};
	
	myapp.tab.volume.createWin = function(cloudName,apiUrl,apiKey,secretKey,opt,tab,img){
		var cmd = "listVolumes";

		var btn = Ti.UI.createButton({
			backgroundImage:img,
			height:11,
			width:16
		});
		btn.addEventListener('click', function(){
			alert("Not implemented yet.");
		});
		
		var win = Ti.UI.createWindow({  
    		title:cloudName + ':VOLUME',
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
    		for (var i=0; i<json.listvolumesresponse.volume.length;i++) {
      			var info = json.listvolumesresponse.volume[i];
 
      			// ここからCellを生成する
      			var labelId = Ti.UI.createLabel({
        			text:info.id,
        			font:{fontSize:15,fontWeight:'bold'}, textAlign:'left',
        			color:'#000',top:0, left:3, width:45
        		});
      			// ラベルを生成
      			var labelName = Ti.UI.createLabel({
        			text:info.name,
        			font:{fontSize:15,fontWeight:'bold'}, textAlign:'left',
        			color:'#000',top:0, left:50, width:100
      			});
      			// ラベルを生成
      			var labelState = Ti.UI.createLabel({
        			text:info.state,
        			font:{fontSize:10}, textAlign:'left',
        			color:'#000',top:0, left:155, width:50
      			});
      			var labelVmDisplayName = Ti.UI.createLabel({
        			text:info.vmdisplayname,
        			font:{fontSize:10}, textAlign:'left',
        			color:'#000',top:0, left:210, width:'auto'
      			});
      			// Cellのクラス名と高さを定義
      			var row = Ti.UI.createTableViewRow({
        			className:"NomalCell",
        			height:60
      			});
 
      			// RowにLabelオブジェクトの追加
      			row.add(labelId);
      			row.add(labelName);
      			row.add(labelState);
      			row.add(labelVmDisplayName);
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
    			var detailLabel = Ti.UI.createLabel({
					color:'#999',
					text:"id:" + json.listvolumesresponse.volume[event.index].id + "\n" +
						"name:" + json.listvolumesresponse.volume[event.index].name + "\n" +
						"size:" + json.listvolumesresponse.volume[event.index].size + "\n" +
						"state:" + json.listvolumesresponse.volume[event.index].state + "\n" +
						"type:" + json.listvolumesresponse.volume[event.index].type + "\n" +
						"vmdisplayname:" + json.listvolumesresponse.volume[event.index].vmdisplayname + "\n" +
						"vmname:" + json.listvolumesresponse.volume[event.index].vmname + "\n" +
						"vmstate:" + json.listvolumesresponse.volume[event.index].vmstate,
					font:{fontSize:14,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top:10,
					left:5,
					height:'auto',
					width:'auto'
				});
				
				var detailWin = Ti.UI.createWindow({
					title: cloudName + ':VOLUME:' + json.listvolumesresponse.volume[event.index].id,
					backgroundColor: '#fff',
				});
		
				detailWin.add(detailLabel);
				tab.open(detailWin);
			});
  		};
  		// HTTPリクエストの送信
  		xhr.send();
  		
  		return win;
 	};
})();

