function reStart() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetGame = ss.getSheets()[0];
  var sheet = ss.getSheets()[1];
  
  
  var next = Browser.msgBox("�����ݒ�ł�����x���H","���̃X�R�A�̓��Z�b�g����܂�", Browser.Buttons.OK_CANCEL);
  
  if (next == 'ok'){
    
    fieldInit();
    
    var panels_color = ["#ff0808","#f7ff08","#19ba04","#0509fc","#f005e8","#03fffb","#ff8903","#830bba","#4d6070"]; //�p�ӂ���Ă���p�l���̐F 
    var set_color = []; //�g�p����p�l���̐F
    var pan_name = [];�@//�v���_�E���ɐݒ肷��F�̘a��
    var color_name = {"#ff0808":"��","#f7ff08":"��","#19ba04":"��","#0509fc":"��","#f005e8":"��","#03fffb":"��","#ff8903":"��","#830bba":"��","#4d6070":"�D"};
  �@var panels = sheet.getRange("F3").getValue();
    
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
 }  
}
   

  
