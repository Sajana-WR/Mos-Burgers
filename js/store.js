function selectCategory(category) {
  document.getElementById("categoryBtn").innerText = category;
}
let updateIndex = -1;
let burgerList = JSON.parse(localStorage.getItem("store")) || [];

function addTbl() {
  




  let icode = document.getElementById("txtIcode").value;
  let name = document.getElementById("txtName").value;
  let category = document.getElementById("categoryBtn").textContent;
  let price = document.getElementById("txtPrice").value;
  let discount = document.getElementById("txtDiscount").value;
  let quantity = document.getElementById("txtQty").value;
  let date = document.getElementById("txtDate").value;

  burgerList.push({
    icode: icode,
    name: name,
    category: category,
    price: price,
    discount: discount,
    quantity: quantity,
    date: date,
  });

  

  clearInputs();

  loadTable();
}

function loadTable() {
  let table = document.getElementById("tblStore");

  let body = `<tr>

    <th>Item Code</th>
    <th>Item Name</th>
    <th>Item Category</th>
    <th>Item Price</th>
    <th>Item Discount</th>
    <th>Item Quantity</th>
    <th>expiry date</th>
    <th>Action</th>
    

    
    </tr>`;

  localStorage.setItem("store", JSON.stringify(burgerList));

  burgerList.forEach((element, index) => {
    body += `<tr>
            <td>${element.icode}</td>
            <td>${element.name}</td>
            <td>${element.category}</td>
            <td>${element.price}</td>
            <td>${element.discount}</td>
            <td>${element.quantity}</td>
            <td>${element.date}</td>
            <td>
                <input type="button" id="btnUpdate" value="update" onClick="Up(${index})">
                 
            </td>

            <td><input type="button" id="btnDelete" value="delete" onClick="del(${index})"> </td>
        
        
        </tr>`;
  });

  table.innerHTML = body;
}

function checkExpiredFoods() {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let validFood = [];
  let expiredFood = [];

  for (let i = 0; i < burgerList.length; i++) {
    let expire = new Date(burgerList[i].date);

    if (expire < today) {
      expiredFood.push(burgerList[i]);
    } else {
      validFood.push(burgerList[i]);
    }
  }

  if (expiredFood.length > 0) {
    let message = "Expired Foods:\n\n";

    for (let i = 0; i < expiredFood.length; i++) {
      message +=
        "code" +
        expiredFood[i].icode +
        "Name" +
        expiredFood[i].name +
        "Expiry" +
        expiredFood[i].date +
        "\n";
    }

    alert(message);
  }

  burgerList = validFood;

  localStorage.setItem("store", JSON.stringify(burgerList));

  loadTable();
}

function del(index){

  let element = burgerList[index];

  updateIndex = index;

  burgerList.splice(index, 1);

  console.log(burgerList);

  localStorage.setItem("store",JSON.stringify(burgerList));
  loadTable();

  

}

function Up(index) {
  let element = burgerList[index];

  updateIndex = index;

  document.getElementById("btnAdd").value = "Update";

  let upd=document.getElementById("btnAdd");

  upd.onclick=updtbl;



  document.getElementById("txtIcode").value = element.icode;
  document.getElementById("txtName").value = element.name;
  document.getElementById("categoryBtn").textContent = element.category;
  document.getElementById("txtPrice").value = element.price;
  document.getElementById("txtDiscount").value = element.discount;
  document.getElementById("txtQty").value = element.quantity;
  document.getElementById("txtDate").value = element.date;
 
  
}

function updtbl(){
   let icode = document.getElementById("txtIcode").value;

    let name = document.getElementById("txtName").value;

    let category = document.getElementById("categoryBtn").textContent;

    let price = document.getElementById("txtPrice").value;

    let discount = document.getElementById("txtDiscount").value;

    let quantity = document.getElementById("txtQty").value;

    let date = document.getElementById("txtDate").value;

    burgerList[updateIndex] = {

        icode: icode,
        name: name,
        category: category,
        price: price,
        discount: discount,
        quantity: quantity,
        date: date

    };


    // Save updated array
    localStorage.setItem(
        "store",
        JSON.stringify(burgerList)
    );


    // Change button back to Add
    document.getElementById("btnAdd").value = "Add";


    // Change button function back to addTbl
    document.getElementById("btnAdd").onclick = addTbl;


    // Reset update index
    updateIndex = -1;


    clearInputs();

    loadTable();

}

function clearInputs() {

    document.getElementById("txtIcode").value = "";

    document.getElementById("txtName").value = "";

    document.getElementById("txtPrice").value = "";

    document.getElementById("txtDiscount").value = "";

    document.getElementById("txtQty").value = "";

    document.getElementById("txtDate").value = "";

    document.getElementById("categoryBtn").innerText = "Categories";
}




loadTable();
checkExpiredFoods();
