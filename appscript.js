const wbook = SpreadsheetApp.getActive();
const sheet = wbook.getSheetByName('botsheet')

function doGet() {
  if(sheet!=null){
    let data = []
    const rlen = sheet.getLastRow();
    const clen = sheet.getLastColumn();
    const rows =  sheet.getRange(1,1,rlen,clen).getValues();

    for(let i=0; i<rows.length; i++){
      const datarow = rows[i];
      let record = {};
      for (let j=0; j<clen; j++){
        record[rows[0][j]] = datarow[j]
      }

      if(i>0){
        data.push(record)
      }
    }

    console.log(data)
    
    const response = {
      "data" : data
    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
  }
  
}

function doPost(request){
  
  if(request){
    data = request.parameter
    sheet.appendRow([
      data.id,
      data.nama,
      data.no,
      data.q1,
      data.bb,
      data.tb,
      data.imt,
      data.q2,
      data.q3,
      data.q4,
      data.q5,
      data.q6,
      data.q7,
      data.q8,
      data.q9,
      data.q10,
      data.q11,
      data.q12,
      data.q13,
      data.q14,
      data.total,
      data.kategori,
    ]);
  
  
    let response = {
      "success" : true,
      "message" : "insert data successfully",
      "request" :  request,
      "data" : data

    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
  }
  else
  {
    let response = {
      "success" : false,
      "message" : "insert data gagal",
    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
  }
}
