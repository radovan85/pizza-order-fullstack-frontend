export class CartItem {

    private _cartItemId?: number;
    private _quantity?: number;
    private _price?: number;
    private _pizzaSizeId?: number;
    private _cartId?: number;

    get cartItemId(): number | undefined {
        return this._cartItemId;
    }

    set cartItemId(value: number | undefined) {
        this._cartItemId = value;
    }

    get quantity(): number | undefined {
        return this._quantity;
    }

    set quantity(value: number | undefined) {
        this._quantity = value;
    }

    get price(): number | undefined {
        return this._price;
    }

    set price(value: number | undefined) {
        this._price = value;
    }

    get pizzaSizeId(): number | undefined {
        return this._pizzaSizeId;
    }

    set pizzaSizeId(value: number | undefined) {
        this._pizzaSizeId = value;
    }

    get cartId(): number | undefined {
        return this._cartId;
    }

    set cartId(value: number | undefined) {
        this._cartId = value;
    }
}
