function Customer(id,name,address,contactNo) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __contactNo = contactNo;

    this.setCustomerId = function (value) {
        __id = value;
    }
    this.getCustomerId = function() {
        return __id;
    }

    this.setCustomerName = function (value) {
        __name = value;
    }
    this.getCustomerName = function() {
        return __name;
    }

    this.setCustomerAddress = function (value) {
        __address = value;
    }
    this.getCustomerAddress = function() {
        return __address;
    }

    this.setCustomerContact = function (value) {
        __contactNo = value;
    }
    this.getCustomerContact = function() {
        return __contactNo;
    }

}