// -----------------------------------------------------------------------------------------------------------------
//-------------------------------------------------Pages Properties-------------------------------------------------

// Home Page Properties
var orderBtn = document.getElementById('getStart');
var homeSlider = document.getElementsByClassName('slide');

// Order Page Properties
var orderTitle = document.getElementById('orderTitle');
var smallTitle = document.getElementsByClassName('labelSS');
var formSS = document.getElementsByClassName('formSS');
var orderId = document.getElementById('orderIdGrid');
var table = document.getElementById('cart');
var total = document.getElementById('totalGrid');
var finalBtn = document.getElementById('finalBtn');

// Item Page Properties
var itemTitle = document.getElementById('itemTitle');
var itemForm = document.getElementById('itemForm');
var itemTable = document.getElementById('itemTable');

// Customer Page Properties
var customerTitle = document.getElementById('customerTitle');
var customerForm = document.getElementById('customerForm');
var customerTable = document.getElementById('customerTable');



var live = 0;
var searchTxt = document.getElementById('txtSearch');
var searchBtn = document.getElementById('btnSearch');



// -----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------Hide Pages methods-------------------------------------------------

//Hide Home Page
function homePageHide() {
    orderBtn.style.display = 'none';
    homeSlider[0].style.display = 'none';
}

//Hide Order Page
function orderPageHide() {
    orderTitle.style.display = 'none';
    smallTitle[0].style.display = 'none';
    smallTitle[1].style.display = 'none';
    formSS[0].style.display = 'none';
    formSS[1].style.display = 'none';
    orderId.style.display = 'none';
    table.style.display = 'none';
    total.style.display = 'none';
    finalBtn.style.display = 'none';
}

//Hide Item Page
function itemPageHide() {
    itemTitle.style.display = 'none';
    itemForm.style.display = 'none';
    itemTable.style.display = 'none';

    searchTxt.style.display = 'none';
    searchBtn.style.display = 'none';
}

//Hide Customer Page
function customerPageHide() {
    customerTitle.style.display = 'none';
    customerForm.style.display = 'none';
    customerTable.style.display = 'none';

    searchTxt.style.display = 'none';
    searchBtn.style.display = 'none';
}



// -----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------Load Pages methods-------------------------------------------------

//Load Home Page
function homePageLoad() {
    live = 0;

    orderBtn.style.display = 'block';
    homeSlider[0].style.display = 'block';

    document.title = "Home | Golden Mart";
}

//Load Order Page
function orderPageLoad() {
    live = 1;

    orderTitle.style.display = 'block';
    smallTitle[0].style.display = 'block';
    smallTitle[1].style.display = 'block';
    formSS[0].style.display = 'block';
    formSS[1].style.display = 'block';
    orderId.style.display = 'inline';
    table.style.display = 'block';
    total.style.display = 'block';
    finalBtn.style.display = 'block';

    document.title = "Order | Golden Mart";
    $('#orderTxtCustomerName,#orderTxtCustomerAddress,#orderTxtItemName,#orderTxtQtyOnHand,#orderTxtUnitPrice').attr("disabled",true);
    //$('#lblTotal,#lblDiscount,#lblsubTotalAmount').text("");
    $("#btnUpdateQty").css('display', 'none');

    getNewOrderId();
}

//Load Item Page
function itemPageLoad() {
    live = 2;

    itemTitle.style.display = 'block';
    itemForm.style.display = 'block';
    itemTable.style.display = 'block';

    searchTxt.style.display = 'block';
    searchBtn.style.display = 'block';

    $("#btnItemUpdate,#btnItemDelete").css('display', 'none');
    document.title = "Item | Golden Mart";
}

//Load Customer Page
function customerPageLoad() {
    live = 3;

    customerTitle.style.display = 'block';
    customerForm.style.display = 'block';
    customerTable.style.display = 'block';

    searchTxt.style.display = 'block';
    searchBtn.style.display = 'block';

    $("#btnCustomerUpdate,#btnCustomerDelete").css('display', 'none');
    document.title = "Customer | Golden Mart";
}



// -----------------------------------------------------------------------------------------------------------------
//-------------------------------------------------load home page---------------------------------------------------
orderPageHide();
itemPageHide();
customerPageHide();

searchBtn.style.display = 'none';
searchTxt.style.display = 'none';



// -----------------------------------------------------------------------------------------------------------------
//---------------------------------------------------Click Events---------------------------------------------------

// home click event
var home = document.getElementById('homeClick');
home.addEventListener('click', function () {
    if (live == 0) {
        homePageHide();
    } else if (live == 1) {
        orderPageHide();
    } else if (live == 2) {
        itemPageHide();
    } else if (live == 3) {
        customerPageHide();
    }
    homePageLoad();
});

// logo click event
var logo = document.getElementById('logoClick');
logo.addEventListener('click', function () {
    if (live == 0) {
        homePageHide();
    } else if (live == 1) {
        orderPageHide();
    } else if (live == 2) {
        itemPageHide();
    } else if (live == 3) {
        customerPageHide();
    }
    homePageLoad();
});

// order click event
var homeOrder = document.getElementById('orderClick');
homeOrder.addEventListener('click', function () {
    if (live == 0) {
        homePageHide();
    } else if (live == 1) {
        orderPageHide();
    } else if (live == 2) {
        itemPageHide();
    } else if (live == 3) {
        customerPageHide();
    }
    orderPageLoad();
});

// order button click event
var homeOrderBtn = document.getElementById('OrderBtn');
homeOrderBtn.addEventListener('click', function () {
    if (live == 0) {
        homePageHide();
    } else if (live == 1) {
        orderPageHide();
    } else if (live == 2) {
        itemPageHide();
    } else if (live == 3) {
        customerPageHide();
    }
    orderPageLoad();
});

// Item click event
var homeItem = document.getElementById('itemClick');
homeItem.addEventListener('click', function () {
    if (live == 0) {
        homePageHide();
    } else if (live == 1) {
        orderPageHide();
    } else if (live == 2) {
        itemPageHide();
    } else if (live == 3) {
        customerPageHide();
    }
    itemPageLoad();
});

// Customer click event
var homeCustomer = document.getElementById('customerClick');
homeCustomer.addEventListener('click', function () {
    if (live == 0) {
        homePageHide();
    } else if (live == 1) {
        orderPageHide();
    } else if (live == 2) {
        itemPageHide();
    } else if (live == 3) {
        customerPageHide();
    }
    customerPageLoad();
});