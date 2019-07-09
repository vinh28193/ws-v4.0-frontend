
export const searchKeys = [
    {key: 'order.ordercode', name: 'BIN'},
    {key: 'product.id', name: 'SOI'},
    {key: 'order.buyer_email', name: 'Email'},
    {key: 'order.buyer_phone', name: 'Phone'},
    {key: 'order.customer_id', name: 'Customer ID'},
    {key: '', name: 'Tracking Code'},
    {key: 'order.purchase_transaction_id', name: 'PO Transaction'},
];
export const timeKeys = [
    {key: 'order.created_at', name: 'Time Create Order'},
    {key: 'order.updated_at', name: 'Time Update Order'},
    // {key: '', name: 'Time Support Time'},
    {key: '', name: 'Time Payment time'},
    {key: 'order.supporting', name: 'Time Supporting'},
    {key: 'order.supported', name: 'Time Supported'},
    {key: 'order.ready_purchase', name: 'Time Ready2Purchase'},
    {key: 'order.purchased', name: 'Time Purchased'},
    {key: 'order.seller_shipped', name: 'Time Seller Shipped'},
    {key: 'order.stockin_us', name: 'Time StockIn US'},
    {key: 'order.stockout_us', name: 'Time StockOut US'},
    {key: 'order.stockin_local', name: 'Time StockIn Local'},
    {key: 'order.stockout_local', name: 'Time StockOut Local'},
    {key: 'order.at_customer', name: 'Time At Customer'},
    {key: 'order.returned', name: 'Time Return'},
    {key: 'order.cancel', name: 'Time Cancelled'},
    {key: 'order.lost', name: 'Time Lost'},
    // {key: '', name: 'Time Confirm Purchase'},
    // {key: '', name: 'At Customer'},
];
export const paymentRequests = [
    {key: 'order.createTime', name: 'New Add fee'},
    {key: 'order.createTime', name: 'Aproved Add fee'},
    {key: 'order.createTime', name: 'Addffee Requested'},
    {key: 'order.createTime', name: 'Not Has Refund'},
    {key: 'order.createTime', name: 'New Refund'},
    {key: 'order.createTime', name: 'Aproved Refund'},
    {key: 'order.createTime', name: 'Refund Requested'},
    {key: 'order.createTime', name: 'Refund Success'},
    {key: 'order.createTime', name: 'Addfee Success'},
    {key: 'order.createTime', name: 'Approve'},
    {key: 'order.createTime', name: 'Decline'},
];
export const orderStatus = [
    {key: 'NEW', name: 'New'},
    {key: 'CONTACTING', name: 'Contacting'},
    {key: 'AWAITING_PAYMENT', name: 'Awaiting Payment'},
    {key: 'READY2PURCHASE', name: 'Ready2Purchase'},
    {key: 'PURCHASING', name: 'Purchasing'},
    {key: 'AWAITING_CONFIRM_PURCHASE', name: 'Awaiting Confirm Purchase'},
    {key: 'PURCHASED', name: 'Purchased'},
    {key: 'DELIVERING', name: 'Delivering'},
    {key: 'DELIVERED', name: 'Delivered'},
    {key: 'REFUNDED', name: 'Refunded order'},
    {key: 'CANCELLED', name: 'Cancel order'},
];
export const StatusOrder = [
  {id: 1, key: 'new', name: 'NEW'},
  {id: 2, key: 'contacting', name: 'CONTACTING'},
  {id: 3, key: 'awaiting_payment', name: 'AWAITING_PAYMENT'},
  {id: 4, key: 'ready_purchase', name: 'READY2PURCHASE'},
  {id: 5, key: 'purchasing', name: 'PURCHASING'},
  {id: 6, key: 'awaiting_confirm_purchase', name: 'AWAITING_CONFIRM_PURCHASE'},
  {id: 7, key: 'delivering', name: 'DELIVERING'},
  {id: 8, key: 'delivered', name: 'DELIVERED'},
  {id: 9, key: 'returned', name: 'RETURNED'},
  {id: 10, key: 'cancelled', name: 'CANCELLED'},
  {id: 11, key: 'junk', name: 'JUNK'},
];
