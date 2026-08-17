let customerList=JSON.parse(localStorage.getItem("customer"))||[];
let updateIndex = -1;
function addCustomer(){

    let cusid=document.getElementById("txtid").value;
    let cusname=document.getElementById("txtname").value;
    let cusphone=document.getElementById("txtphone").value;
    let cusemail=document.getElementById("txtemail").value;


    customerList.push({

        cusid:cusid,
        cusname:cusname,
        cusphone:cusphone,
        cusemail:cusemail

    });


    clearInputs();
    loadTable();

}

function loadTable(){

    

    let body=`<tr>
        <th>Customer Id</th>
        <th>Customer name</th>
        <th>Customer phone</th>
        <th>Customer email</th>
        <th>Action</th>
    
    
    </tr>`

    localStorage.setItem("customer",JSON.stringify(customerList));

    customerList.forEach((element,index) => {
        body+=`<tr>
            
            <td>${element.cusid}</td>
            <td>${element.cusname}</td>
            <td>${element.cusphone}</td>
            <td>${element.cusemail}</td>
            <td><input type="button" value="update" onClick="updateOrder(${index})">
            <input type="button" value="delete" onClick="deleteOrder(${index})">


            </td>
            
        </tr>`
    });


    document.getElementById("tblCus").innerHTML=body;

}
function deleteOrder(index){
    let element = customerList[index];
    updateIndex=index;

     customerList.splice(index, 1);

     localStorage.setItem("store",JSON.stringify(customerList));
     loadTable();
    


}


function clearInputs(){

     cusid=document.getElementById("txtid").value="";
     cusname=document.getElementById("txtname").value="";
     cusphone=document.getElementById("txtphone").value="";
     cusemail=document.getElementById("txtemail").value="";
}


function updateOrder(index){
    let order=JSON.parse(localStorage.getItem("customer"));
    
    updateIndex=index;

    document.getElementById("txtid").value=order[index].cusid;
    document.getElementById("txtname").value=order[index].cusname;
    document.getElementById("txtphone").value=order[index].cusphone;
    document.getElementById("txtemail").value=order[index].cusemail;
    document.getElementById("btnAdd").value="Update";

    let upd=document.getElementById("btnAdd");

    upd.onclick=updtbl;


}

function updtbl(){
    let cusid=document.getElementById("txtid").value;
    let cusname=document.getElementById("txtname").value;
    let cusphone=document.getElementById("txtphone").value;
    let cusemail=document.getElementById("txtemail").value;
    
    customerList[updateIndex]={

        cusid:cusid,
        cusname:cusname,
        cusphone:cusphone,
        cusemail:cusemail



    };

    // Save updated array
    localStorage.setItem("customer",JSON.stringify(customerList));

    loadTable();

    clearInputs();
}

loadTable();