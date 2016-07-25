class ReceiptItems {
  constructor(cartItem, saved, subtotal) {
    this.cartItem = cartItem;
    this.saved = saved;
    this.subtotal = subtotal;
  }

  getName(){
    return this.cartItem.getName();
  }
  getUnit(){
    return this.cartItem.getUnit();
  }
  getPrice(){
    return this.cartItem.getPrice();
  }
  getCount(){
    return this.cartItem.count;
  }

  static buildReceiptItems(cartItems, allPromotions) {

    const discount = (count, price, promotionType) => {

      let subtotal = count * price;
      let saved = 0;

      if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
        saved = parseInt(count / 3) * price;
      }

      subtotal -= saved;

      return {saved, subtotal};
    }

    const findPromotionType = (barcode, promotions) => {

      const promotion = promotions.find(promotion => promotion.barcodes.some(b => b === barcode));

      return promotion ? promotion.type : undefined;
    }

    return cartItems.map(cartItem => {

      const promotionType = findPromotionType(cartItem.getBarcode(), allPromotions);

      const {saved, subtotal} = discount(cartItem.getCount(), cartItem.getPrice(), promotionType);

      return new ReceiptItems(cartItem, saved, subtotal);
    });
  }
}

module.exports = ReceiptItems;

