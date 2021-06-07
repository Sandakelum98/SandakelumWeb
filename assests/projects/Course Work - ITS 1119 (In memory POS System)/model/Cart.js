function Cart(itemCode,itemName,qtyOnHand,unitPrice,qty,total) {
    let __itemCode = itemCode;
    let __itemName = itemName;
    let __qtyOnHand = qtyOnHand;
    let __unitPrice = unitPrice;
    let __qty = qty;
    let __total = total;

    this.setItemCode = function (value) {
        __itemCode = value;
    }
    this.getItemCode = function () {
        return __itemCode;
    }

    this.setItemName = function (value) {
        __itemName = value;
    }
    this.getItemName = function () {
        return __itemName;
    }

    this.setQtyOnHand = function (value) {
        __qtyOnHand = value;
    }
    this.getQtyOnHand = function () {
        return __qtyOnHand;
    }

    this.setUnitPrice = function (value) {
        __unitPrice = value;
    }
    this.getUnitPrice = function () {
        return __unitPrice;
    }

    this.setQty = function (value) {
        __qty = value;
    }
    this.getQty = function () {
        return __qty;
    }

    this.setTotal = function (value) {
        __total = value;
    }
    this.getTotal = function () {
        return __total;
    }
}