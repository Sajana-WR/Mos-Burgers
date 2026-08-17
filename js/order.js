let orderList = JSON.parse(localStorage.getItem("order")) || [];
let indexOrder=-1;
function addOrder() {
  let oid = document.getElementById("txtOid").value;
  let cname = document.getElementById("txtCusName").value;
  let itemName = document.getElementById("txtItemName").value;
  let Qty = document.getElementById("txtQty").value;
  let Dis = document.getElementById("txtDis").value;
  let price = document.getElementById("txtpri").value;

  orderList.push({
    oid: oid,
    cname: cname,
    itemName: itemName,
    Qty: Qty,
    Dis: Dis,
    price: price,
  });

  localStorage.setItem("order", JSON.stringify(orderList));

  clearInputs();

  loadTable();
}

function loadTable() {
  let table = document.getElementById("tblOrder");

  let o = JSON.parse(localStorage.getItem("order"));

  let body = `<tr>
        
        <th>Order Id</th>
        <th>Customer Name</th>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Action</th>
    
    
    </tr>`;

  o.forEach((element, index) => {
    body += `<tr>
    
        <td>${element.oid}</td>
        <td>${element.cname}</td>
        <td>${element.itemName}</td>
        <td>${element.Qty}</td>
     <td>${
       element.Dis === undefined
         ? element.Qty * element.price
         : (element.Qty * element.price * (100 - element.Dis)) / 100
     }</td>

        <td><input type="button" value="update" onClick="updateorder(${index})"></input>
        <input type="button" value="delete" onClick="deleteorder(${index})"></input>
        </td>
        
        
    </tr>`;
  });

  table.innerHTML = body;
}

function deleteorder(index) {
  let element = orderList[index];

  orderList.splice(index, 1);

  localStorage.setItem("order", JSON.stringify(orderList));

  loadTable();
}
function updateorder(index) {
  let element = orderList[index];

  indexOrder=index;

   document.getElementById("btnAdd").value="Update";


  document.getElementById("txtOid").value = element.oid;
  document.getElementById("txtCusName").value = element.cname;
  document.getElementById("txtItemName").value = element.itemName;
  document.getElementById("txtQty").value = element.Qty;
  document.getElementById("txtDis").value = element.Dis;
  document.getElementById("txtpri").value = element.price;

 

  let up=document.getElementById("btnAdd");
  up.onclick=updateor;

 


}

function updateor(){

   let oid = document.getElementById("txtOid").value;
  let cname = document.getElementById("txtCusName").value;
  let itemName = document.getElementById("txtItemName").value;
  let Qty = document.getElementById("txtQty").value;
  let Dis = document.getElementById("txtDis").value;
  let price = document.getElementById("txtpri").value;



  orderList[indexOrder]={
      oid:oid,
      cname:cname,
      itemName:itemName,
      Qty:Qty,
      Dis:Dis,
      price:price

 } 

 console.log(orderList);

 localStorage.setItem("order",JSON.stringify(orderList));

loadTable();

clearInputs();
document.getElementById("btnAdd").value="Add Order";

}

function clearInputs() {
  document.getElementById("txtOid").value = "";
  document.getElementById("txtCusName").value = "";
  document.getElementById("txtItemName").value = "";
  document.getElementById("txtQty").value = "";
  document.getElementById("txtDis").value = "";
  document.getElementById("txtpri").value = "";
}

function SearchOrder() {
  let input = document.getElementById("txtCode").value;
  let store = JSON.parse(localStorage.getItem("store"));

  for (let i = 0; i < store.length; i++) {
    if (input == store[i].icode) {
      document.getElementById("txtItemName").value = store[i].name;
      document.getElementById("txtQty").value = store[i].quantity;
      document.getElementById("txtDis").value = store[i].Dis;
      document.getElementById("txtpri").value = store[i].price;
    } else {
      clearInputs();
    }
  }
}

function SearchCustomer() {
  let input = document.getElementById("txtId").value;
  let no = document.getElementById("txtId").value;
  let customer = JSON.parse(localStorage.getItem("customer"));

  for (let i = 0; i < customer.length; i++) {
    if (input == customer[i].cusid || no == customer[i].cusphone) {
      document.getElementById("txtCusName").value = customer[i].cusname;
    }
  }
}

loadTable();
