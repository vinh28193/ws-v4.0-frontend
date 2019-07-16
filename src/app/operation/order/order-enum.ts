
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
    // {key: 'walletTransactions.created_at', name: 'Time Payment Time Create'},
    {key: 'order.contacting', name: 'Time Contacting'},
    {key: 'order.awaiting_payment', name: 'Time Awaiting Payment'},
    {key: 'order.ready_purchase', name: 'Time Ready2Purchase'},
    {key: 'order.purchasing', name: 'Time Purchasing'},
    {key: 'order.awaiting_confirm_purchase', name: 'Time Awaiting Confirm Purchase'},
    {key: 'order.purchased', name: 'Time Purchased'},
    {key: 'order.delivering', name: 'Time Delivering'},
    {key: 'order.refunded', name: 'Time Delivered'},
    {key: 'order.delivered', name: 'Time Delivered'},
    {key: 'order.cancel', name: 'Time Cancelled'},
    {key: 'order.junk', name: 'Time Junk'},
    // {key: '', name: 'Time Confirm Purchase'},
    // {key: '', name: 'At Customer'},
];
export const paymentRequests = [
    {key: 'order.createTime', name: 'Not Has Refund'},
    {key: 'order.createTime', name: 'New Refund'},
    {key: 'order.createTime', name: 'Aproved Refund'},
    {key: 'order.createTime', name: 'Refund Requested'},
    {key: 'order.createTime', name: 'Refund Success'},
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
    {key: 'JUNK', name: 'Junk'},
];
export const StatusOrder = [
  {id: 1, key: 'new', name: 'NEW'},
  {id: 2, key: 'contacting', name: 'CONTACTING'},
  {id: 3, key: 'awaiting_payment', name: 'AWAITING_PAYMENT'},
  {id: 4, key: 'ready_purchase', name: 'READY2PURCHASE'},
  {id: 5, key: 'purchasing', name: 'PURCHASING'},
  {id: 6, key: 'awaiting_confirm_purchase', name: 'AWAITING_CONFIRM_PURCHASE'},
  {id: 7, key: 'purchased', name: 'PURCHASED'},
  {id: 8, key: 'delivering', name: 'DELIVERING'},
  {id: 9, key: 'delivered', name: 'DELIVERED'},
  {id: 10, key: 'refunded', name: 'REFUNDED'},
  {id: 11, key: 'cancelled', name: 'CANCELLED'},
  {id: 12, key: 'junk', name: 'JUNK'}
];
