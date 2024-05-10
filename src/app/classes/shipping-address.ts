export class ShippingAddress {
    private _shippingAddressId?: number;
    private _address?: string;
    private _city?: string;
    private _postcode?: string;
    private _customerId?: number;

    get shippingAddressId(): number | undefined {
        return this._shippingAddressId;
    }

    set shippingAddressId(value: number | undefined) {
        this._shippingAddressId = value;
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

    get customerId(): number | undefined {
        return this._customerId;
    }

    set customerId(value: number | undefined) {
        this._customerId = value;
    }
}

