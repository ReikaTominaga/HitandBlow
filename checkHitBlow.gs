function checkHitBlow() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetGame = ss.getSheets()[0];
  var sheet = ss.getSheets()[1];
  
  var kaito = ["E5","G5","I5","K5"];
  var turnCount = sheetGame.getRange("A1").getValue();
  var sentaku_check = [];
  var endFlag = 0;
  
  for(let i = 0 ; i < 4 ; i++){
    sentaku_check[i] = sheetGame.getRange(kaito[i]).getValue();
  }
    
   if (endFlag == 1){
     Browser.msgBox("���̃Q�[���͏I�����܂���","���̃Q�[�����J�n���Ă�������", Browser.Buttons.OK);
   }else{
   if(sentaku_check.indexOf("") != -1){
     Browser.msgBox("�񓚂�I�����Ă�������","���I���͕s�ł�", Browser.Buttons.OK);
   }else{
  
  var ans_set = ["AK12","AK13","AK14","AK15"];
  var last_open = ["AJ12","AJ13","AJ14","AJ15"];
  var turnCell = {"1":"C","2":"E","3":"G","4":"I","5":"K","6":"M","7":"O","8":"Q","9":"S","10":"U","11":"W","12":"Y","13":"AA","14":"AC","15":"AE","16":"AG"}
  var color_name_copy = {"��":"#ff0808","��":"#f7ff08","��":"#19ba04","��":"#0509fc","��":"#f005e8","��":"#03fffb","��":"#ff8903","��":"#830bba","�D":"#4d6070"};
  var kaito_color = [];
  var sentaku_iro = [];
  var kotae_check = []; //�����̃p�l���̐F�R�[�h
  
  for(let i = 0 ; i < 4 ; i++){
    let sentaku = sheetGame.getRange(kaito[i]).getValue();
    let color_copy = (turnCell[turnCount]+(i+12));
    sheetGame.getRange(color_copy).setBackground(color_name_copy[sentaku]);
    sentaku_iro[i] = color_name_copy[sentaku];
    kotae_check[i] = sheetGame.getRange(ans_set[i]).getValue();
    Logger.log(sentaku_iro);
  }
  
  //blow�̃`�F�b�N
  var blowCount = 0;
  var hitCount = 0;
  var blow_check = [];
  
  for(let i = 0 ; i < 4 ; i++){
    blow_check[i] = kotae_check[i];
    Logger.log(blow_check);
  }
  for(let i = 0 ; i < 4 ; i++){
    let kekka = blow_check.indexOf(sentaku_iro[i]);
     Logger.log(kekka);
    if (kekka != -1){
      blow_check[kekka] = "OK";
      blowCount++;
    }
  }

  if (blowCount == "0"){
    let next = Browser.msgBox("�c�O�I",hitCount+"�q�b�g�F"+blowCount+"�u���[", Browser.Buttons.OK);
    sheetGame.getRange(turnCell[turnCount]+9).setValue(hitCount);
    sheetGame.getRange(turnCell[turnCount]+10).setValue(blowCount);
    
    endFlag = nextTurn(turnCount,endFlag,last_open,kotae_check);
    
  }else{
  //hit�̃`�F�b�N
    for(let i = 0 ; i < 4 ; i++){
      if (kotae_check[i] == sentaku_iro[i]){
        blowCount--;
        hitCount++;
      }
     }
     
    switch(hitCount){
    case 0:
    case 1:
      setKekka(hitCount,blowCount,"�܂��܂���Ȃ��E�E�E",turnCell,turnCount);
      endFlag = nextTurn(turnCount,endFlag,last_open,kotae_check);
      break;
    case 2:
      setKekka(hitCount,blowCount,"�����A������Ƃ�������",turnCell,turnCount);
      endFlag = nextTurn(turnCount,endFlag,last_open,kotae_check);
      break;
    case 3:
      setKekka(hitCount,blowCount,"�������I���������I",turnCell,turnCount);
      endFlag = nextTurn(turnCount,endFlag,last_open,kotae_check);
      break;
     case 4:
      for(let i = 0 ; i < 4 ; i++){
        sheetGame.getRange(last_open[i]).setBackground(kotae_check[i]);
      }
        setKekka(hitCount,blowCount,"���߂łƂ��I���Ȃ��̏����ł�",turnCell,turnCount);
        endFlag = 1;
        break;
     }

    } 
 �@}
}
}
 

function nextTurn(turnCount,endFlag,last_open,kotae_check) {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetGame = ss.getSheets()[0];
  var sheet = ss.getSheets()[1];
  var players = sheet.getRange("A3").getValue();
  
  Logger.log(turnCount);
  if (turnCount >= 8 && turnCount == players*4){
    for(let i = 0 ; i < 4 ; i++){
      sheetGame.getRange(last_open[i]).setBackground(kotae_check[i]);
      Logger.log(endFlag);
      endFlag = 1;
    }
  }else{
  sheetGame.getRange("A1").setValue(turnCount+1);
  
  const cell1 = sheetGame.getRange("E5").setValue("");
  const cell2 = sheetGame.getRange("G5").setValue("");
  const cell3 = sheetGame.getRange("I5").setValue("");
  const cell4 = sheetGame.getRange("K5").setValue("");
  
  var anata_Turn = ["A3","A4","A5","A6"];
  var sanka_name = ["B3","B4","B5","B6","B7"];
  
  for(let i = 0 ; i < 4 ; i++){
    let cur =  sheetGame.getRange(anata_Turn[i]).getValue();
    if (cur == "���Ȃ��̔Ԃł�"){
      if(anata_Turn[i] == "A6"){
        sheetGame.getRange("A3").setValue("���Ȃ��̔Ԃł�");
        sheetGame.getRange(anata_Turn[i]).setValue("");
        break;
      }else if ((sheetGame.getRange(sanka_name[(i+1)])).getValue() == "" ){
        sheetGame.getRange("A3").setValue("���Ȃ��̔Ԃł�");
        sheetGame.getRange(anata_Turn[i]).setValue("");
        break;
      }else{
        sheetGame.getRange(anata_Turn[i+1]).setValue("���Ȃ��̔Ԃł�");
        sheetGame.getRange(anata_Turn[i]).setValue("")
        break;
      }
     break; 
     }
   }
 }
}

   
function setKekka(hitCount,blowCount,msg,turnCell,turnCount) {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetGame = ss.getSheets()[0];
  
  Browser.msgBox(msg,hitCount+"�q�b�g�F"+blowCount+"�u���[", Browser.Buttons.OK);
  sheetGame.getRange(turnCell[turnCount]+9).setValue(hitCount);
  sheetGame.getRange(turnCell[turnCount]+10).setValue(blowCount);
}

