function shuffleTurn() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[1];
  var players = sheet.getRange("A3");
  var setPlayers = Number(players.getValues()) + 2;  
  var range = sheet.getRange(`D3:E${setPlayers}`);
  
  var shuffle = range.randomize();
  shuffle.setValues(shuffle.getValues());
}
