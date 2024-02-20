function addNewWEField(){
   
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.classList.add("mt-2")
    newNode.classList.add("rows",3);
    newNode.setAttribute('placeholder','Enter Here')

    let weOb = document.getElementById("we");
    let weAddBtnOb = document.getElementById("weAddButton");

    weOb.insertBefore(newNode,weAddBtnOb);

}

function addNewAQField(){
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("eqField");
    newNode.classList.add("mt-2")
    newNode.classList.add("rows",3);
    newNode.setAttribute('placeholder','Enter Here')

    let aqOb = document.getElementById("aq");
    let aqAddBtnOb = document.getElementById("aqAddButton");

    aqOb.insertBefore(newNode,aqAddBtnOb);
}

//generate CV

function generateCV(){
    let nameField = document.getElementById("nameField").value;
    let nameT1 = document.getElementById("nameT1")

    nameT1.innerHTML = nameField; 
    
    //direct
    document.getElementById("nameT2").innerHTML = nameField;

    //contacts
    document.getElementById("number").innerHTML = document.getElementById("contactField").value;

    //gmail
    document.getElementById("gmail").innerHTML = document.getElementById("gmailField").value;

    document.getElementById("addressT").innerHTML = document.getElementById("addressField").value;

    document.getElementById("gitL").innerHTML = document.getElementById("gitField").value;

    document.getElementById("LinkedT").innerHTML = document.getElementById("linField").value;

    document.getElementById("instaT").innerHTML = document.getElementById("instaField").value;

    //objectives

    document.getElementById("objectiveT").innerHTML = document.getElementById("objectiveField").value;

    let wes = document.getElementsByClassName("weField");

    let str = "";
    for (let e of wes){
        str = str + `<li>${e.value}</li>`;
    }

    document.getElementById('weT').innerHTML = str;
    //aq

    let aq = document.getElementsByClassName("eqField");

    let str1="";
    for(let e of aq){
        str1 += `<li> ${e.value} </li>`;
    }

    document.getElementById("aqT").innerHTML = str1;


    //image setting

    let file = document.getElementById("imgField").files[0];
    console.log(file);
    let reader = new FileReader()

    reader.readAsDataURL(file);

    console.log(reader.result);

    //image set to cv
    reader.onloadend = function(){
        document.getElementById('imgTemplate').src = reader.result;
    };

    document.getElementById("cv-form").style.display='none';
    document.getElementById("cv-template").style.display='block';

}

function PrintCV(){
    window.print();
}