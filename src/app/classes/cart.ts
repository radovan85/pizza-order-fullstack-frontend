export class Cart {
    private _cartId?: number;
    private _customerId?: number;
    private _cartItemIds?: number[];
    private _cartPrice?: number;

    get cartId(): number | undefined {
        return this._cartId;
    }

    set cartId(value: number | undefined) {
        this._cartId = value;
    }

    get customerId(): number | undefined {
        return this._customerId;
    }

    set customerId(value: number | undefined) {
        this._customerId = value;
    }

    get cartItemIds(): number[] | undefined {
        return this._cartItemIds;
    }

    set cartItemIds(value: number[] | undefined) {
        this._cartItemIds = value;
    }

    get cartPrice(): number | undefined {
        return this._cartPrice;
    }

    set cartPrice(value: number | undefined) {
        this._cartPrice = value;
    }
}
