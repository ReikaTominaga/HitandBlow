function configGame() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[1];
  var sheetGame = ss.getSheets()[0];
  
  var players = sheet.getRange("A3").getValue();
  var panels = sheet.getRange("F3").getValue();
  
  fieldInit();
    
  sheetGame.showColumns(19, 16);
  switch(players){
    case 1:
    case 2:
      sheetGame.hideColumns(19,16);
      break;
    case 3:
      sheetGame.hideColumns(27,8);
      break;
    case 4:
    break;    
  }  
  var panels_color = ["#ff0808","#f7ff08","#19ba04","#0509fc","#f005e8","#03fffb","#ff8903","#830bba","#4d6070"]; //用意されているパネルの色 
  var set_color = []; //使用するパネルの色
  var pan_name = [];　//プルダウンに設定する色の和名
  var color_name = {"#ff0808":"赤","#f7ff08":"黄","#19ba04":"緑","#0509fc":"青","#f005e8":"桃","#03fffb":"水","#ff8903":"橙","#830bba":"紫","#4d6070":"灰"};
  
//選択に使用するパネルの設定 
  switch(panels){
    case 6:
      for(let len = panels_color.length , i = 0 ; len > 3 ; len-- , i++){
        let rndCol = (Math.floor(Math.random()*len));
        set_color[i] = panels_color[rndCol];
        panels_color[rndCol] = panels_color[len-1];
      }
     break;
    case 7:
      for(let len = panels_color.length , i = 0 ; len > 2 ; len-- , i++){
        let rndCol = (Math.floor(Math.random()*len));
        set_color[i] = panels_color[rndCol];
        panels_color[rndCol] = panels_color[len-1];
      }
     break;
    case 8:
      for(let len = panels_color.length , i = 0 ; len > 1 ; len-- , i++){
        let rndCol = (Math.floor(Math.random()*len));
        set_color[i] = panels_color[rndCol];
        panels_color[rndCol] = panels_color[len-1];
      }
     break;
  }    

  for(let i = 0 ; i < panels ; i++){
    let set_cho_color = ["D2","F2","H2","J2","L2","N2","P2","R2"];
    sheetGame.getRange(set_cho_color[i]).setBackground(set_color[i]);
    sheetGame.getRange(set_cho_color[i]).setValue(color_name[set_color[i]]);
    pan_name[i] = color_name[set_color[i]];
  } 

//プルダウンの設定
  
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(pan_name).build();
  const cell1 = sheetGame.getRange("E5").setDataValidation(rule).setValue("");
  const cell2 = sheetGame.getRange("G5").setDataValidation(rule).setValue("");
  const cell3 = sheetGame.getRange("I5").setDataValidation(rule).setValue("");
  const cell4 = sheetGame.getRange("K5").setDataValidation(rule).setValue("");

  ansPanel(set_color);
  Browser.msgBox("設定が完了したよ！","ゲーム画面に移動してね", Browser.Buttons.OK)
}

//初期化
function fieldInit(){
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = ss.getSheets()[1];
   var sheetGame = ss.getSheets()[0];
   
   let clear_hb = sheetGame.getRange("C9:AG10");
   let clear_color = sheetGame.getRange("C12:AG15");
   let clear_junban = sheetGame.getRange("A3:A6");
   let ans_color = sheetGame.getRange("AJ12:AJ15");
   let cho_color = sheetGame.getRange("D2:R2");
   var turnCount = sheetGame.getRange("A1");
  
   clear_hb.setValue("");
   clear_junban.setValue("");
   clear_color.setBackground(null);
   cho_color.setBackground(null).setValue("");
   ans_color.setBackground("#363333");
   turnCount.setValue("1");
   let junban = sheetGame.getRange("A3").setValue("あなたの番です");
}

//正解のパネル設定
function ansPanel(set_color) {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[1];
  var sheetGame = ss.getSheets()[0];
  
  var ans_set = ["AK12","AK13","AK14","AK15"];
  var ari_flag = sheet.getRange("I3").getValue();
  var nashi_flag = sheet.getRange("I4").getValue();

//色の重複あり
  if (ari_flag == true){
    for(let i = 0 ;  i < 4 ; i++){
      let rndCol = (Math.floor(Math.random()*set_color.length));
      sheetGame.getRange(ans_set[i]).setValue(set_color[rndCol]).setFontColor("#363333");
      
    }
  }else{
//色の重複なし
    for(let len = set_color.length , i = 0 ;  i < 4 ; len-- , i++){
      let rndCol = (Math.floor(Math.random()*len));
      sheetGame.getRange(ans_set[i]).setBackground(set_color[rndCol])
      sheetGame.getRange(ans_set[i]).setValue(set_color[rndCol]).setFontColor("#363333");
      set_color[rndCol] = set_color[len-1];
      
    }
  }
  
}
