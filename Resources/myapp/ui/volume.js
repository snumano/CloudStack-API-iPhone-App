(function() {
	myapp.cmd.volume = {};
	Titanium.include("../subroutine.js");
		
	myapp.cmd.volume.createWin = function(cloudName,apiUrl,apiKey,secretKey,opt){
		var cmd = "listVolumes";
		
		var addBtn = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.ADD
		});
		
		addBtn.addEventListener('click', function(){
			alert("Not implemented yet.");
		});
		
		var win = Ti.UI.createWindow({  
    		title:cloudName + ':VOLUME',
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
    		for (var i=0; i<json.listvolumesresponse.volume.length;i++) {
      			var info = json.listvolumesresponse.volume[i];
 
      			var labelId = Ti.UI.createLabel({
        			text:info.id,
        			font:{fontSize:15,fontWeight:'bold'}, textAlign:'left',
        			color:'#000',top:0, height:60, left:3, width:45
        		});
      			var labelName = Ti.UI.createLabel({
        			text:info.name,
        			font:{fontSize:15,fontWeight:'bold'}, textAlign:'left',
        			color:'#000',top:0, height:60, left:50, width:100
      			});
      			var labelState = Ti.UI.createLabel({
        			text:info.state,
        			font:{fontSize:10}, textAlign:'left',
        			color:'#000',top:0, height:60, left:155, width:50
      			});
      			var labelVmDisplayName = Ti.UI.createLabel({
        			text:info.vmdisplayname,
        			font:{fontSize:10}, textAlign:'left',
        			color:'#000',top:0, height:60, left:210, width:'auto'
      			});
      			var row = Ti.UI.createTableViewRow({
        			className:"NomalCell",
        			height:60
      			});
 
      			row.add(labelId);
      			row.add(labelName);
      			row.add(labelState);
      			row.add(labelVmDisplayName);
      			row.setHasChild(true);
      			data.push(row);
    		}

    		var tableView =Ti.UI.createTableView({
      			data:data,
      			editable:true
    		});
    		
    		win.add(tableView);

			tableView.addEventListener('delete', function(e){
				alert("Not implemented yet.\nNot deleted.");
			});
		    tableView.addEventListener('click', function(e){
    			var detailLabel = Ti.UI.createLabel({
					color:'#999',
					text:"id:" + json.listvolumesresponse.volume[e.index].id + "\n" +
						"name:" + json.listvolumesresponse.volume[e.index].name + "\n" +
						"size:" + json.listvolumesresponse.volume[e.index].size + "\n" +
						"state:" + json.listvolumesresponse.volume[e.index].state + "\n" +
						"type:" + json.listvolumesresponse.volume[e.index].type + "\n" +
						"vmdisplayname:" + json.listvolumesresponse.volume[e.index].vmdisplayname + "\n" +
						"vmname:" + json.listvolumesresponse.volume[e.index].vmname + "\n" +
						"vmstate:" + json.listvolumesresponse.volume[e.index].vmstate,
					font:{fontSize:14,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top:10,
					left:5,
					height:'auto',
					width:'auto'
				});
				
				var detailWin = Ti.UI.createWindow({
					title: cloudName + ':VOLUME:' + json.listvolumesresponse.volume[e.index].id,
					backgroundColor: 'white',
					barColor:'black'
				});
		
				detailWin.add(detailLabel);
				tabGroup.activeTab.open(detailWin);
			});
  		};
  		xhr.send();
  		xhr.onerror = function(e){
  			alert(e);
       	};
       
  		return win;
 	};
})();