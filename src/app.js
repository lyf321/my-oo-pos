const Item = require('./models/Item');
const Promotion = require('./models/Promotion');
const CartItem = require('./models/CartItem');
const ReceiptItems = require('./models/ReceiptItems');
const Receipt = require('./models/Receipt');

function printReceipt(tags) {

  const cartItems = CartItem.buildCartItems(tags, Item.all());

  const receiptItems = ReceiptItems.buildReceiptItems(cartItems, Promotion.all());

  const receipt = new Receipt(receiptItems);

  const receiptText = Receipt.buildReceiptText(receipt);

  console.log(receiptText);
}

exports.printReceipt = printReceipt;
