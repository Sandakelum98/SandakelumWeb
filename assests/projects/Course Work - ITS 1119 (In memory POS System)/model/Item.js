function Item(code,name,unitPrice,qtyOnHand) {
    let __code = code;
    let __name = name;
    let __unitPrice = unitPrice;
    let __qtyOnHand = qtyOnHand;

    this.setItemCode = function (value) {
        __code = value;
    }
    this.getItemCode = function () {
        return __code;
    }

    this.setItemName = function (value) {
        __name = value;
    }
    this.getItemName = function () {
        return __name;
    }

    this.setItemUnitPrice = function (value) {
        __unitPrice = value;
    }
    this.getItemUnitPrice = function () {
        return __unitPrice;
    }

    this.setItemQtyOnHand = function (value) {
        __qtyOnHand = value;
    }
    this.getItemQtyOnHand = function () {
        return __qtyOnHand;
    }
}