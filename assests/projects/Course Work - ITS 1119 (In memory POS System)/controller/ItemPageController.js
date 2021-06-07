//Key Events------------------------------------------------------------------------------------------------------------

//Item Code Text
$('#txtItemCode').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#txtItemName').focus();
    }
});

//Item Name Text
$('#txtItemName').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#txtUnitPrice').focus();
    }
});

//Unit Price Text
$('#txtUnitPrice').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#txtQtyOnHand').focus();
    }
});

//Qty on Hand Text
$('#txtQtyOnHand').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#btnItemSave').focus();
    }
});

//search Text
$('#txtSearch').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#btnSearch').focus();
    }
});


// -----------------------------------------------------Events----------------------------------------------------------

//save button action
$('#btnItemSave').click(function () {
    var isValided = itemValidation();
    if (isValided) {
        let itemCode = $('#txtItemCode').val();
        let itemName = $('#txtItemName').val();
        let unitPrice = $('#txtUnitPrice').val();
        let qtyOnHand = $('#txtQtyOnHand').val();

        let isSaved = saveItem(itemCode, itemName, unitPrice, qtyOnHand);
        if (isSaved) {
            alert("Saved !");
            loadItems();
            //clearItemTxtFields();
            $('#itemForm').trigger("reset");
            $("#txtItemCode,#txtItemName,#txtUnitPrice,#txtQtyOnHand").css('border', '1px solid #E0E0E0');
        } else {
            alert("Failed !");
        }
    }
});

//cancel button action
$('#btnItemCancel').click(function () {
    clearItemTxtFields();
    $("#txtItemCode").attr("disabled", false);
    $("#txtItemCode,#txtItemName,#txtUnitPrice,#txtQtyOnHand").css('border', '1px solid #E0E0E0');
    $("#btnItemUpdate,#btnItemDelete").css('display', 'none');
    $("#btnItemSave").css('display', 'block');

    /*var rowLength = ($('#itemTableBody tr').length);
    for (var i=0 ; i<rowLength ; i++) {
        let id = $('#tblCustomer>tr:eq(i)').children('td:eq(0)').text();
        console.log('id is : '+id);
    }

    $("#itemTableBody tr").on("click", function() {
        console.log($(this).index());
    });*/

});

//search button action
$("#btnSearch").click(function () {
    if (live == 2) {
        let itemCodeRegEx = /^(I0)[0-9]{1}[0-9]{1}$/;
        if (itemCodeRegEx.test($('#txtSearch').val())) {
            let item = searchItem($('#txtSearch').val());
            if (item != null) {
                $("#txtItemCode").val(item.getItemCode());
                $("#txtItemName").val(item.getItemName());
                $("#txtUnitPrice").val(item.getItemUnitPrice());
                $("#txtQtyOnHand").val(item.getItemQtyOnHand());

                $("#btnItemSave").css('display', 'none');
                $("#btnItemUpdate,#btnItemDelete").css('display', 'block');
                $("#txtItemCode").attr("disabled", true);
            } else {
                alert("Can not found Item !");
            }
        } else {
            alert('Invalid Item Code')
        }
    }
});

//update button action
$('#btnItemUpdate').click(function () {
    var isValided = itemValidation();
    if (isValided) {
        let itemCode = $('#txtItemCode').val();
        let itemName = $('#txtItemName').val();
        let unitPrice = $('#txtUnitPrice').val();
        let qtyOnHand = $('#txtQtyOnHand').val();

        let option = confirm('Do you want to Update Item, Code : ' + itemCode);
        if (option) {
            var isUpdate = updateItem(itemCode, itemName, unitPrice, qtyOnHand);
            if (isUpdate) {
                alert('Item Updated');

                loadItems()
                clearItemTxtFields();
                $("#txtItemCode").attr("disabled", false);
                $("#txtItemCode,#txtItemName,#txtUnitPrice,#txtQtyOnHand").css('border', '1px solid #E0E0E0');
                $("#btnItemUpdate,#btnItemDelete").css('display', 'none');
                $("#btnItemSave").css('display', 'block');
            } else {
                alert('Update failed')
            }
        }
    }
});

//delete button action
$('#btnItemDelete').click(function () {
    let itemCode = $("#txtItemCode").val();
    let option = confirm('Do you want to delete ID : ' + itemCode);
    if (option) {
        var isDeleted = deleteItem(itemCode);
        if (isDeleted) {
            alert('Item Deleted');

            loadItems();
            clearItemTxtFields();
            $("#txtItemCode").attr("disabled", false);
            $("#btnItemUpdate,#btnItemDelete").css('display', 'none');
            $("#btnItemSave").css('display', 'block');
        } else {
            alert('Delete Failed');
        }
    }
});


// ---------------------------------------------------Functions---------------------------------------------------------

//=========== CRUD operations ===========

//Save Item
function saveItem(itemCode, itemName, unitPrice, qtyOnHand) {
    var item = new Item(itemCode, itemName, unitPrice, qtyOnHand);
    itemDB.push(item);
    return true;
}

//Search Item
function searchItem(code) {
    for (var i in itemDB) {
        if (itemDB[i].getItemCode() == code) return itemDB[i];
    }
    return null;
}

//Update Item
function updateItem(itemCode, itemName, unitPrice, qtyOnHand) {
    let item = searchItem(itemCode);
    if (item != null) {
        item.setItemName(itemName);
        item.setItemName(itemName)
        item.setItemUnitPrice(unitPrice);
        item.setItemQtyOnHand(qtyOnHand);
        return true;
    } else {
        return false;
    }
}

//Delete Customer
function deleteItem(code) {
    let item = searchItem(code);
    if (item != null) {
        let indexNo = itemDB.indexOf(item);
        itemDB.splice(indexNo, 1);
        return true;
    } else {
        return false;
    }
}


//-------------------------------------------------Other Functions------------------------------------------------------
function loadItems() {
    $('#itemTableBody').empty();
    for (var i of itemDB) {
        let row = "<tr><td>" + i.getItemCode() + "</td><td>" + i.getItemName() + "</td><td>" + i.getItemUnitPrice() + "</td><td>" + i.getItemQtyOnHand() + "</td></tr>";
        $('#itemTable').append(row);
    }
}

function clearItemTxtFields() {
    $("#txtItemCode").val("");
    $('#txtItemName').val("");
    $('#txtUnitPrice').val("");
    $('#txtQtyOnHand').val("");
    $("#txtSearch").val("");
}

//========validation========
function itemValidation() {
    let itemCodeRegEx = /^(I0)[0-9]{1}[0-9]{1}$/;
    let itemNameRegEx = /^[A-Z]{1}[a-z]{1,}$/;
    let unitPriceRegEx = /^[0-9]{1,4}(.)(0){2}$/;
    let qtyOnHandRegEx = /^[0-9]{1,5}$/;

    let itemCodeValidation = true;
    let itemNameValidation = true;
    let unitPriceValidation = true;
    let qtyOnHandValidation = true;

    if (itemCodeRegEx.test($('#txtItemCode').val())) {
        $("#txtItemCode").css('border', '1px solid green');
        itemCodeValidation = true;
    } else {
        $("#txtItemCode").css('border', '1px solid red');
        itemCodeValidation = false;
    }

    if (itemNameRegEx.test($('#txtItemName').val())) {
        $("#txtItemName").css('border', '1px solid green');
        itemNameValidation = true;
    } else {
        $("#txtItemName").css('border', '1px solid red');
        itemNameValidation = false;
    }

    if (unitPriceRegEx.test($('#txtUnitPrice').val())) {
        $("#txtUnitPrice").css('border', '1px solid green');
        unitPriceValidation = true;
    } else {
        $("#txtUnitPrice").css('border', '1px solid red');
        unitPriceValidation = false;
    }

    if (qtyOnHandRegEx.test($('#txtQtyOnHand').val())) {
        $("#txtQtyOnHand").css('border', '1px solid green');
        qtyOnHandValidation = true;
    } else {
        $("#txtQtyOnHand").css('border', '1px solid red');
        qtyOnHandValidation = false;
    }


    if (itemCodeValidation == false) {
        alert("Invalid Item Code type \nType Example : I001");
    } else if (itemNameValidation == false) {
        alert("Invalid Item Name type \nType Example : Kirisamba");
    } else if (unitPriceValidation == false) {
        alert('Invalid Unit Price \nType Example : 150.00')
    } else if (qtyOnHandValidation == false) {
        alert('Invalid Qty On Hand \nType Example : 100')
    } else {
        return true;
    }
}