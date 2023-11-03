export interface Buy {
    map(arg0: (buy: Buy) => void): unknown;
    product: number,
    quantity : number,
    purchaseOrder: number
}