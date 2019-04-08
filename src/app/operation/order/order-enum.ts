
export const searchKeys = [
    {key: 'order.ordercode', name: 'BIN'},
    {key: 'product.id', name: 'SOI'},
    {key: 'product.sku', name: 'SKU'},
    {key: 'coupon.code', name: 'Coupon Code'},
    {key: 'product.category_id', name: 'Category Id'},
    {key: 'product.product_name', name: 'Product Name'},
    {key: 'email', name: 'Email'},
    {key: 'phone', name: 'Phone'},
    {key: 'order.customer_id', name: 'Customer ID'},
    {key: 'product.category_id', name: 'Category ID'},
    {key: '', name: 'Payment Token'},
    {key: '', name: 'Payment Monthod'},
    {key: 'order.purchase_order_id', name: 'PO'},
    {key: 'order.purchase_transaction_id', name: 'PO Transaction'},
];
export const timeKeys = [
    {key: 'order.created_at', name: 'Time Create Order'},
    {key: 'order.updated_at', name: 'Time Update Order'},
    {key: 'order.purchased', name: 'Time Purchased'},
    {key: 'order.seller_shipped', name: 'Time Seller Shipped'},
    {key: 'order.stockin_us', name: 'Time StockIn US'},
    {key: 'order.stockout_us', name: 'Time StockOut US'},
    {key: 'order.stockin_local', name: 'Time StockIn Local'},
    {key: 'order.stockout_local', name: 'Time StockOut Local'},
    {key: 'order.at_customer', name: 'Time At Customer'},
    {key: 'order.returned', name: 'Time Return'},
    {key: 'order.cancelled', name: 'Time Cancelled'},
    {key: 'order.lost', name: 'Time Lost'}
];
export const paymentRequests = [
    {key: 'order.createTime', name: 'New Add fee'},
    {key: 'order.createTime', name: 'Aproved Add fee'},
    {key: 'order.createTime', name: 'Addffee Requested'},
    {key: 'order.createTime', name: 'Not Has Refund'},
    {key: 'order.createTime', name: 'New Refund'},
    {key: 'order.createTime', name: 'Aproved Refund'},
    {key: 'order.createTime', name: 'Refund Requested'},
    {key: 'order.createTime', name: 'Refund/Addfee success'},
    {key: 'order.createTime', name: 'Refund/Addfee Fail'},
];
export const orderStatus = [
    {key: 'NEW', name: 'New order'},
    {key: 'SUPPORTING', name: 'Supporting'},
    {key: 'SUPPORTED', name: 'Supported'},
    {key: 'READY2PURCHASE', name: 'Ready purchase'},
    {key: 'PURCHASING', name: 'Purchasing'},
    {key: 'PURCHASE_PENDING', name: 'Purchase pending'},
    {key: 'PURCHASED', name: 'Purchased'},
    {key: 'EXPWH_STOCKOUT', name: 'US warehouse'},
    {key: 'IMPWH_STOCKIN', name: 'Local warehouse'},
    {key: 'CUSTOMER_RECEIVED', name: 'Success order'},
    {key: 'REFUNDED', name: 'Refunded order'},
    {key: 'CANCEL', name: 'Cancel order'},
    {key: 'REPLACED', name: 'Replaced order'},
    {key: 'JUNK', name: 'Junk'},
    {key: '', name: 'SanBox'}
];
