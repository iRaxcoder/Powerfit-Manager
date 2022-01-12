import jsPDF from 'jspdf'
import "jspdf-autotable";

let base64String = "";
let imageBase64Stringsep="";

const convertToBase64File = () =>{
    var reader = new FileReader();

    var aFileParts = ['<img src="../assets/img/logoreport.jpg"></img>'];
    var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob
      
    reader.onload = function () {
         base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
  
        imageBase64Stringsep = base64String;
        console.log(base64String);
    }
    reader.readAsDataURL(oMyBlob);
}



export const exportToPdf = (headers,data, title) => {
    //convertToBase64File();
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    
    

    let content = {
      headStyles: {fillColor: "#558b23"},
      startY: 50,
      head: headers,
      body: data,
    //   didDrawPage: (data) =>{
    //     doc.addImage(base64String,'JPEG',data.settings.margin.left,15,10,10)
    //   }
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("./reporte.pdf")
}