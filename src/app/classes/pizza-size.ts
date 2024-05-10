export class PizzaSize {
    private _pizzaSizeId?: number;
    private _name?: string;
    private _price?: number;
    private _pizzaId?: number;

    get pizzaSizeId(): number | undefined {
        return this._pizzaSizeId;
    }

    set pizzaSizeId(value: number | undefined) {
        this._pizzaSizeId = value;
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
    }

    get price(): number | undefined {
        return this._price;
    }

    set price(value: number | undefined) {
        this._price = value;
    }

    get pizzaId(): number | undefined {
        return this._pizzaId;
    }

    set pizzaId(value: number | undefined) {
        this._pizzaId = value;
    }
}
