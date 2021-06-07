
//Key Events------------------------------------------------------------------------------------------------------------

//Customer ID Text
$('#txtCustomerId').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#txtCustomerName').focus();
    }
});

//Customer Name Text
$('#txtCustomerName').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#txtCustomerAddress').focus();
    }
});

//Customer Address Text
$('#txtCustomerAddress').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#txtCustomerContact').focus();
    }
});

//Customer Contact Text
$('#txtCustomerContact').on('keyup', function (event) {
    if (event.key == "Enter") {
        $('#btnCustomerSave').focus();
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
$('#btnCustomerSave').click(function () {
    var isValided = customerValidation();
    if (isValided) {
        var customerId = $('#txtCustomerId').val();
        var customerName = $('#txtCustomerName').val();
        var customerAddress = $('#txtCustomerAddress').val();
        var customerContact = $('#txtCustomerContact').val();

        let isSaved = saveCustomer(customerId, customerName, customerAddress, customerContact);
        if (isSaved) {
            alert("Saved !");
            loadCustomers();
            //clearTxtFields();
            $('#customerForm').trigger("reset");
            $("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").css('border', '1px solid #E0E0E0');
        } else {
            alert("Failed !");
        }
    }
});

//cancel button action
$('#btnCustomerCancel').click(function () {
    clearCustomerTxtFields();
    $("#txtCustomerId").attr("disabled",false);
    $("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").css('border', '1px solid #E0E0E0');
    $("#btnCustomerUpdate,#btnCustomerDelete").css('display', 'none');
    $("#btnCustomerSave").css('display', 'block');
});

//search button action
$("#btnSearch").click(function () {
    if (live == 3) {
        let customerIdRegEx = /^(C0)[0-9]{1}[0-9]{1}$/;
        if (customerIdRegEx.test($('#txtSearch').val())) {
            let customer = searchCustomer($('#txtSearch').val());
            if (customer != null) {
                $("#txtCustomerId").val(customer.getCustomerId());
                $("#txtCustomerName").val(customer.getCustomerName());
                $("#txtCustomerAddress").val(customer.getCustomerAddress());
                $("#txtCustomerContact").val(customer.getCustomerContact());

                $("#btnCustomerSave").css('display', 'none');
                $("#btnCustomerUpdate,#btnCustomerDelete").css('display', 'block');
                $("#txtCustomerId").attr("disabled",true);
            } else {
                alert("Can not found customer !");
            }
        } else {
            alert('Invalid Customer ID')
        }


    }
});


//update button action
$('#btnCustomerUpdate').click(function () {
    var isValided = customerValidation();
    if (isValided) {
        let customerId = $("#txtCustomerId").val();
        let customerName = $('#txtCustomerName').val();
        let customerAddress = $('#txtCustomerAddress').val();
        let customerContact = $('#txtCustomerContact').val();

        let option = confirm('Do you want to Update Customer ID : ' + customerId);
        if (option) {
            var isUpdate = updateCustomer(customerId, customerName, customerAddress, customerContact);
            if (isUpdate) {
                alert('Customer Updated');

                loadCustomers();
                clearCustomerTxtFields();
                $("#txtCustomerId").attr("disabled",false);
                $("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").css('border', '1px solid #E0E0E0');
                $("#btnCustomerUpdate,#btnCustomerDelete").css('display', 'none');
                $("#btnCustomerSave").css('display', 'block');
            } else {
                alert('Update failed')
            }
        }
    }
});


//delete button action
$('#btnCustomerDelete').click(function () {
    let customerId = $("#txtCustomerId").val();
    let option = confirm('Do you want to delete ID : ' + customerId);
    if (option) {
        var isDeleted = deleteCustomer(customerId);
        if (isDeleted) {
            alert('Customer Deleted');

            loadCustomers();
            clearCustomerTxtFields();
            $("#txtCustomerId").attr("disabled",false);
            $("#btnCustomerUpdate,#btnCustomerDelete").css('display', 'none');
            $("#btnCustomerSave").css('display', 'block');
        } else {
            alert('Delete Failed');
        }
    }

});

//table row click
$('#customerTableBody>tr').click(function () {
    console.log('Fuck');

    let customerId = $(this).children('td:eq(0)').text();
    let customerName = $(this).children('td:eq(1)').text();
    let customerAddress = $(this).children('td:eq(2)').text();
    let customerContact = $(this).children('td:eq(3)').text();

    console.log(customerId + ' ' + customerName + ' ' + customerAddress);

    $("#txtCustomerId").val(customerId);
    $('#txtCustomerName').val(customerName);
    $('#txtCustomerAddress').val(customerAddress);
    $('#txtCustomerContact').val(customerContact);
});


// ---------------------------------------------------Functions---------------------------------------------------------

//=========== CRUD operations ===========

//Save Customer
function saveCustomer(customerId, customerName, customerAddress, customerContact) {
    var customer = new Customer(customerId, customerName, customerAddress, customerContact);
    customerDB.push(customer);
    return true;
}

//Search Customer
function searchCustomer(id) {
    for (var i in customerDB) {
        if (customerDB[i].getCustomerId() == id) return customerDB[i];
    }
    return null;
}

//Update Customer
function updateCustomer(customerId, customerName, customerAddress, customerContact) {
    let customer = searchCustomer(customerId);
    if (customer != null) {
        customer.setCustomerName(customerName);
        customer.setCustomerAddress(customerAddress);
        customer.setCustomerContact(customerContact);
        return true;
    } else {
        return false;
    }
}

//Delete Customer
function deleteCustomer(customerId) {
    let customer = searchCustomer(customerId);
    if (customer != null) {
        let indexNo = customerDB.indexOf(customer);
        customerDB.splice(indexNo, 1);
        return true;
    } else {
        return false;
    }
}


//-------------------------------------------------Other Functions------------------------------------------------------
function loadCustomers() {
    $('#customerTableBody').empty();
    for (var i of customerDB) {
        let row = "<tr><td>" + i.getCustomerId() + "</td><td>" + i.getCustomerName() + "</td><td>" + i.getCustomerAddress() + "</td><td>" + i.getCustomerContact() + "</td></tr>";
        $('#customerTable').append(row);
    }
}

function clearCustomerTxtFields() {
    $("#txtCustomerId").val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContact').val("");
    $("#txtSearch").val("");
}

//========validation========
function customerValidation() {
    let customerIdRegEx = /^(C0)[0-9]{1}[0-9]{1}$/;
    let customerNameRegEx = /^[A-Z]{1}[a-z]{1,}( )[A-Z]{1}[a-z]{1,}$/;
    let customerContactRegEx = /^(0)[0-9]{9}$/;

    let idValidation = true;
    let nameValidation = true;
    let contactValidation = true;

    if (customerIdRegEx.test($('#txtCustomerId').val())) {
        $("#txtCustomerId").css('border', '1px solid green');
        idValidation = true;
    } else {
        $("#txtCustomerId").css('border', '1px solid red');
        idValidation = false;
    }

    if (customerNameRegEx.test($('#txtCustomerName').val())) {
        $("#txtCustomerName").css('border', '1px solid green');
        nameValidation = true;
    } else {
        $("#txtCustomerName").css('border', '1px solid red');
        nameValidation = false;
    }

    $("#txtCustomerAddress").css('border', '1px solid green');

    if (customerContactRegEx.test($('#txtCustomerContact').val())) {
        $("#txtCustomerContact").css('border', '1px solid green');
        contactValidation = true;
    } else {
        $("#txtCustomerContact").css('border', '1px solid red');
        contactValidation = false;
    }


    if (idValidation == false) {
        alert("Invalid ID type \nType Example : C001");
    } else if (nameValidation == false) {
        alert("Invalid Name type \nType Example : Kamal Perera");
    } else if (contactValidation == false) {
        alert('Invalid Mobile No \nType Example : 0767640530')
    } else {
        return true;
    }
}
