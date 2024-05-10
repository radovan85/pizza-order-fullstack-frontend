export class OrderItem {
    private _orderItemId?: number;
    private _quantity?: number;
    private _price?: number;
    private _pizza?: string;
    private _pizzaSize?: string;
    private _pizzaPrice?: number;
    private _orderId?: number;

    get orderItemId(): number | undefined {
        return this._orderItemId;
    }

    set orderItemId(value: number | undefined) {
        this._orderItemId = value;
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

    get pizza(): string | undefined {
        return this._pizza;
    }

    set pizza(value: string | undefined) {
        this._pizza = value;
    }

    get pizzaSize(): string | undefined {
        return this._pizzaSize;
    }

    set pizzaSize(value: string | undefined) {
        this._pizzaSize = value;
    }

    get pizzaPrice(): number | undefined {
        return this._pizzaPrice;
    }

    set pizzaPrice(value: number | undefined) {
        this._pizzaPrice = value;
    }

    get orderId(): number | undefined {
        return this._orderId;
    }

    set orderId(value: number | undefined) {
        this._orderId = value;
    }
}
