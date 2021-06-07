function Order(orderId,customerId,date,orderDetail) {
    let __orderId = orderId;
    let __customerId = customerId;
    let __date = date;
    let __orderDetail = orderDetail;

    this.setOrderId = function (value) {
        __orderId = value;
    };
    this.getOrderId = function () {
        return __orderId;
    };

    this.setCustomerId = function (value) {
        __customerId = value;
    };
    this.getCustomerId = function () {
        return __customerId;
    };

    this.setDate = function (value) {
        __date = value;
    };
    this.getDate = function () {
        return __date;
    };

    this.setOrderDetail = function (value) {
        __orderDetail = value;
    };
    this.getOrderDetail = function () {
        return __orderDetail;
    };
}