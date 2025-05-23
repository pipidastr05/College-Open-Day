import { jsPDF } from "jspdf";


const getSert = document.getElementById('button-award');
getSert.addEventListener('click', async function (e) {
  e.preventDefault();
  await award();
});


async function award() {
  // Получаем значения из полей
  const lastName = document.getElementById('familia').value.trim();
  const firstName = document.getElementById('imya').value.trim();
  const middleName = document.getElementById('otchestvo').value.trim();

  // Объединяем в одну строку и переводим в ВЕРХНИЙ РЕГИСТР
  const fullName = `${lastName} ${firstName} ${middleName}`.toUpperCase();
 

  
  const doc = new jsPDF({ orientation: "landscape",
    unit: "mm",
    format: [297, 229.5],});
  

   // Загрузка TTF-шрифта как ArrayBuffer
   const fontResponse = await fetch("./fonts/ofont.ru_Uncage.ttf");
   const fontData = await fontResponse.arrayBuffer();
 
   // Преобразуем в base64
   const base64Font = btoa(
     String.fromCharCode(...new Uint8Array(fontData))
   );
 
   // Добавим шрифт во внутреннее хранилище jsPDF
   doc.addFileToVFS("ofont.ru_Uncage.ttf", base64Font);
   doc.addFont("ofont.ru_Uncage.ttf", "uncage", "normal");
   doc.setFont("uncage");

  // Добавление изображения (шаблона сертификата)
  const img = new Image();
  img.src = "./images/sertificat.png";

  img.onload = function () {
    
    // doc.addFont('./fonts/georama/georama_ru-normal.ttf','georama_ru', 'normal');
    // doc.setFont('georama_ru-normal', 'normal');
    
    doc.setFontSize(22);
    doc.addImage(img, "PNG", 0, 0, 297, 229.5); // форма сертификата - 2000 х 1545
    doc.text(fullName, 60, 105); // Пишем ФИО на фоне
    doc.save(`${fullName}_сертификат.pdf`);
  };
}


// import { jsPDF } from "jspdf";


// const getSert = document.getElementById('button-award');
// getSert.addEventListener('click', async function (e) {
//   e.preventDefault();
//   await award();
// });


// async function award() {
//   // Получаем значения из полей
//   const lastName = document.getElementById('familia').value.trim();
//   const firstName = document.getElementById('imya').value.trim();
//   const middleName = document.getElementById('otchestvo').value.trim();

//   // Объединяем в одну строку и переводим в ВЕРХНИЙ РЕГИСТР
//   const fullName = `${lastName} ${firstName} ${middleName}`.toUpperCase();
 

  
//   const doc = new jsPDF({ orientation: "landscape",
//     unit: "mm",
//     format: [297, 229.5],});
  

//    // Загрузка TTF-шрифта как ArrayBuffer
//    const fontResponse = await fetch("./fonts/ofont.ru_Uncage.ttf");
//    const fontData = await fontResponse.arrayBuffer();
 
//    // Преобразуем в base64
//    const base64Font = btoa(
//      String.fromCharCode(...new Uint8Array(fontData))
//    );
 
//    // Добавим шрифт во внутреннее хранилище jsPDF
//    doc.addFileToVFS("ofont.ru_Uncage.ttf", base64Font);
//    doc.addFont("ofont.ru_Uncage.ttf", "uncage", "normal");
//    doc.setFont("uncage");

//   // Добавление изображения (шаблона сертификата)
//   const img = new Image();
//   img.src = "./images/sertificat.png";

//   img.onload = function () {
    
//     // doc.addFont('./fonts/georama/georama_ru-normal.ttf','georama_ru', 'normal');
//     // doc.setFont('georama_ru-normal', 'normal');
    
//     doc.setFontSize(22);
//     doc.addImage(img, "PNG", 0, 0, 297, 229.5); // форма сертификата - 2000 х 1545
//     doc.text(fullName, 60, 105); // Пишем ФИО на фоне
//     doc.save(`${fullName}_сертификат.pdf`);
//   };
// }




