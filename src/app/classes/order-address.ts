export class OrderAddress {
    private _orderAddressId?: number;
    private _address?: string;
    private _city?: string;
    private _postcode?: string;
    private _orderId?: number;

    get orderAddressId(): number | undefined {
        return this._orderAddressId;
    }

    set orderAddressId(value: number | undefined) {
        this._orderAddressId = value;
    }

    get address(): string | undefined {
        return this._address;
    }

    set address(value: string | undefined) {
        this._address = value;
    }

    get city(): string | undefined {
        return this._city;
    }

    set city(value: string | undefined) {
        this._city = value;
    }

    get postcode(): string | undefined {
        return this._postcode;
    }

    set postcode(value: string | undefined) {
        this._postcode = value;
    }

    get orderId(): number | undefined {
        return this._orderId;
    }

    set orderId(value: number | undefined) {
        this._orderId = value;
    }
}

