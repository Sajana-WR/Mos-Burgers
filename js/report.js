function addTot(){ 

    let toto=document.getElementById("totalOrders");
    let totc=document.getElementById("totalCustomers");

    toto.textContent=JSON.parse(localStorage.getItem("order")).length;
    totc.textContent=JSON.parse(localStorage.getItem("customer")).length;


    let orders=JSON.parse(localStorage.getItem("order"));
    let total=0;
    orders.forEach(order => {
        total+=order.Qty*order.price;
    });

    let tots=document.getElementById("totalSales");
    tots.textContent=total;
}

function bestSellingItem() {

    let orders = JSON.parse(localStorage.getItem("order")) || [];

    let items = {};

    orders.forEach(order => {

        if (items[order.itemName]) {
            items[order.itemName] += Number(order.Qty);
        } else {
            items[order.itemName] = Number(order.Qty);
        }

    });

    let bestItem = "";
    let highest = 0;

    for (let item in items) {

        if (items[item] > highest) {
            highest = items[item];
            bestItem = item;
        }

    }

    document.getElementById("bestSellingItems").textContent = bestItem;
}

bestSellingItem();

addTot();