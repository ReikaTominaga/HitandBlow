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
  var panels_color = ["#ff0808","#f7ff08","#19ba04","#0509fc","#f005e8","#03fffb","#ff8903","#830bba","#4d6070"]; //�p�ӂ���Ă���p�l���̐F 
  var set_color = []; //�g�p����p�l���̐F
  var pan_name = [];�@//�v���_�E���ɐݒ肷��F�̘a��
  var color_name = {"#ff0808":"��","#f7ff08":"��","#19ba04":"��","#0509fc":"��","#f005e8":"��","#03fffb":"��","#ff8903":"��","#830bba":"��","#4d6070":"�D"};
  
//�I���Ɏg�p����p�l���̐ݒ� 
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

//�v���_�E���̐ݒ�
  
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(pan_name).build();
  const cell1 = sheetGame.getRange("E5").setDataValidation(rule).setValue("");
  const cell2 = sheetGame.getRange("G5").setDataValidation(rule).setValue("");
  const cell3 = sheetGame.getRange("I5").setDataValidation(rule).setValue("");
  const cell4 = sheetGame.getRange("K5").setDataValidation(rule).setValue("");

  ansPanel(set_color);
  Browser.msgBox("�ݒ肪����������I","�Q�[����ʂɈړ����Ă�", Browser.Buttons.OK)
}

//������
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
   let junban = sheetGame.getRange("A3").setValue("���Ȃ��̔Ԃł�");
}

//�����̃p�l���ݒ�
function ansPanel(set_color) {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[1];
  var sheetGame = ss.getSheets()[0];
  
  var ans_set = ["AK12","AK13","AK14","AK15"];
  var ari_flag = sheet.getRange("I3").getValue();
  var nashi_flag = sheet.getRange("I4").getValue();

//�F�̏d������
  if (ari_flag == true){
    for(let i = 0 ;  i < 4 ; i++){
      let rndCol = (Math.floor(Math.random()*set_color.length));
      sheetGame.getRange(ans_set[i]).setValue(set_color[rndCol]).setFontColor("#363333");
      
    }
  }else{
//�F�̏d���Ȃ�
    for(let len = set_color.length , i = 0 ;  i < 4 ; len-- , i++){
      let rndCol = (Math.floor(Math.random()*len));
      sheetGame.getRange(ans_set[i]).setBackground(set_color[rndCol])
      sheetGame.getRange(ans_set[i]).setValue(set_color[rndCol]).setFontColor("#363333");
      set_color[rndCol] = set_color[len-1];
      
    }
  }
  
}
