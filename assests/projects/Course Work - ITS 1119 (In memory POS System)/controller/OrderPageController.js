
//Key Events------------------------------------------------------------------------------------------------------------

//Search Customer text
$('#orderTxtCustomerSearch').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#button-addon2').focus();
    }
});

//customer search button
$('#button-addon2').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#orderTxtItemSearch').focus();
    }
});

//Search Item text
$('#orderTxtItemSearch').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#-addon2').focus();
    }
});

//item search button
$('#-addon2').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#orderTxtQty').focus();
    }
})

//Qty text
$('#orderTxtQty').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#btnAddCart').focus();
    }
})

//add cart button
$('#btnAddCart').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#orderTxtItemSearch').focus();
    }
})


// -----------------------------------------------------Events----------------------------------------------------------

//customer search button action
$('#button-addon2').click(function () {
    let customerIdRegEx = /^(C0)[0-9]{1}[0-9]{1}$/;
    if (customerIdRegEx.test($('#orderTxtCustomerSearch').val())) {
        let customer = searchCustomer($('#orderTxtCustomerSearch').val());
        if (customer != null) {
            $('#orderTxtCustomerName').val(customer.getCustomerName());
            $('#orderTxtCustomerAddress').val(customer.getCustomerAddress());
        } else {
            alert("Can not found customer !");
            $('#orderTxtCustomerName').val('');
            $('#orderTxtCustomerAddress').val('');
        }
        $("#orderTxtCustomerSearch").css('border', '1px solid #E0E0E0');
    } else {
        alert("Invalid ID type \nType Example : C001");
        $("#orderTxtCustomerSearch").css('border', '1px solid red');
        $("#orderTxtCustomerSearch").focus();
    }
});

//item search button action
$('#-addon2').click(function () {
    let itemCodeRegEx = /^(I0)[0-9]{1}[0-9]{1}$/;
    let itemCode = $('#orderTxtItemSearch').val();
    if (itemCodeRegEx.test(itemCode)) {
        let item = searchItem(itemCode);
        if (item != null) {
            $('#orderTxtItemName').val(item.getItemName());
            $("#orderTxtQtyOnHand").val(item.getItemQtyOnHand());
            $("#orderTxtUnitPrice").val(item.getItemUnitPrice());
        } else {
            alert("Can not found Item !");
            $('#orderTxtItemName').val('');
            $("#orderTxtQtyOnHand").val('');
            $("#orderTxtUnitPrice").val('');
        }
        $("#orderTxtItemSearch").css('border', '1px solid #E0E0E0');
    } else {
        alert("Invalid Item Code type \nType Example : I001");
        $("#orderTxtItemSearch").css('border', '1px solid red');
        $("#orderTxtItemSearch").focus();
    }
});

//add cart button action
$('#btnAddCart').off('click');
$('#btnAddCart').on('click',function () {
    //$('#cartBody>tr').off('dblclick');

    let itemCode = $('#orderTxtItemSearch').val();
    let itemName = $('#orderTxtItemName').val();
    let qtyOnHand = $('#orderTxtQtyOnHand').val();
    let unitPrice = $('#orderTxtUnitPrice').val();
    let qty = $('#orderTxtQty').val();
    let total = parseInt(unitPrice) * parseInt(qty)+".00";

    if(itemCode.length != 0 && itemName.length != 0) {
        if(qty.length != 0) {
            //if()
            var cart = new Cart(itemCode,itemName,qtyOnHand,unitPrice,qty,total);
            cartDB.push(cart);

            addToCart();
            getTotal();
            clearItemDetails();

            $("#orderTxtItemSearch").css('border', '1px solid #E0E0E0');
            $("#orderTxtQty").css('border', '1px solid #E0E0E0');
        } else {
            alert('Please enter qty, customer want');
            $("#orderTxtQty").css('border', '1px solid red');
            $("#orderTxtQty").focus();
        }

    } else {
        alert('Select item add to cart');
        $("#orderTxtItemSearch").css('border', '1px solid red');
        $("#orderTxtItemSearch").focus();
    }

    //cart row dbl click - remove item
    $('#cartBody>tr').on('dblclick', function () {
        //console.log($(this).index());
        var rowIndex = $(this).index();
        clearItemDetails();
        cartDB.splice(rowIndex,1);
        addToCart();
        getTotal();
    })

    //cart row click - update item
    $('#cartBody>tr').click(function () {
        var rowIndex = $(this).index();

        $('#orderTxtItemSearch').val(cartDB[rowIndex].getItemCode());
        $('#orderTxtItemName').val(cartDB[rowIndex].getItemName());
        $('#orderTxtQtyOnHand').val(cartDB[rowIndex].getQtyOnHand());
        $('#orderTxtUnitPrice').val(cartDB[rowIndex].getUnitPrice());
        $('#orderTxtQty').val(cartDB[rowIndex].getQty());

        $("#btnAddCart").css('display', 'none');
        $("#btnUpdateQty").css('display', 'inline');
        $("#orderTxtItemSearch").attr("disabled", true);
    });

});

//cancel button 1 action (clear text fields only)
$('#btnCancelTxt').click(function () {
    clearTxtFields();
});

//remove button action
/*$('#btnRemoveItem').click(function () {

});*/

//complete button action
$('#completeBtn').click(function () {
    let orderId = $('#lblOrderId').text();
    console.log(orderId);
    let customerId = $('#orderTxtCustomerSearch').val();
    if(customerId.length == 0){
        customerId = null;
    }
    console.log(customerId);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);

    if (cartDB.length != 0) {
        let isSaved = saveOrder(orderId,customerId,date,cartDB);
        if (isSaved) {
            alert('Saved');
            cartDB.length = 0;
            clearTxtFields();
            addToCart();
            clearTotal();
            getNewOrderId();
        } else {
            alert('Failed')
        }
    } else {
        alert("Please select item");
    }
});

//cancel button 2 action (all)
$('#btnOrderPageCancel').click(function () {
    clearItemDetails();
    clearTxtFields();
    clearTotal();
    cartDB.length = 0;
    addToCart();
});



// ---------------------------------------------------Functions---------------------------------------------------------

//=========== CRUD operations ===========

//Save order
function saveOrder(orderId, customerId, date, cartDB) {
    let order = new Order(orderId,customerId,date,cartDB);
    orderDB.push(order);
    return true;
}


//-------------------------------------------------Other Functions------------------------------------------------------

//clear item details only
function clearItemDetails() {
    $('#orderTxtItemSearch').val("");
    $('#orderTxtItemName').val("");
    $("#orderTxtQtyOnHand").val("");
    $("#orderTxtUnitPrice").val('');
    $("#orderTxtQty").val("");
    $("#btnAddCart").css('display', 'inline');
    $("#btnUpdateQty").css('display', 'none');
    $("#orderTxtItemSearch").attr("disabled", false);
}

//clear text fields
function clearTxtFields() {
    $('#orderTxtCustomerSearch').val("");
    $('#orderTxtCustomerName').val("");
    $('#orderTxtCustomerAddress').val("");
    $("#orderTxtCustomerSearch").css('border', '1px solid #E0E0E0');

    $('#orderTxtItemSearch').val("");
    $('#orderTxtItemName').val("");
    $("#orderTxtQtyOnHand").val("");
    $("#orderTxtUnitPrice").val('');
    $("#orderTxtQty").val("");
    $("#orderTxtItemSearch").css('border', '1px solid #E0E0E0');

    $("#orderTxtQty").css('border', '1px solid #E0E0E0');

    $("#btnAddCart").css('display', 'inline');
    $("#btnUpdateQty").css('display', 'none');
    $("#orderTxtItemSearch").attr("disabled", false);
}

//clear total
function clearTotal() {
    $('#lblTotal').text("0");
    $('#lblDiscount').text("0");
    $('#lblsubTotalAmount').text("0");
}

//addToCart
function addToCart() {
    //console.log('Start');
    $('#cartBody').empty();
    //console.log('clear');
    for (var i in cartDB) {
        let itemCode = cartDB[i].getItemCode();
        let itemName = cartDB[i].getItemName();
        let unitPrice = cartDB[i].getUnitPrice();
        let qty = cartDB[i].getQty();
        let total = cartDB[i].getTotal();

        //console.log(itemCode+" - "+itemName+" - "+unitPrice+" - "+qty+" - "+total);

        let row = "<tr><td>" + itemCode + "</td> <td>" + itemName + "</td> <td>" + unitPrice + "" +
            "</td> <td>" + qty + "</td> <td>" + total + "</td></tr>";
        $('#cartBody').append(row);
    }
}

//total
function getTotal() {
    let gTotal = 0;
    for (var i in cartDB) {
        let total = cartDB[i].getTotal();
        gTotal = gTotal+parseInt(total);
    }
    $('#lblTotal').text(gTotal);

    //discount
    let discount = 0;
    if(5000>gTotal && gTotal>2000) {
        discount = (gTotal/100) * 10;
        $('#lblDiscount').text(discount);
    } else if(gTotal>5000) {
        discount = (gTotal/100) * 20;
        $('#lblDiscount').text(discount);
    } else {
        $('#lblDiscount').text(discount);
    }

    //Sub Total
    let subTotal = gTotal - discount ;
    $('#lblsubTotalAmount').text(subTotal);

}

//get order id
function getNewOrderId() {
    let length = orderDB.length;
    let newId = parseInt(length)+1;
    //console.log(newId);
    if(length<10){
        $('#lblOrderId').text('G00'+newId);
    } else if (length<100) {
        $('#lblOrderId').text('G0'+newId);
    }

}