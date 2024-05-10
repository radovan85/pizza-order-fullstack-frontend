export class Pizza {
    private _pizzaId?: number;
    private _name?: string;
    private _description?: string;
    private _pizzaSizeIds?: number[];
    private _imageUrl?: string;

    get pizzaId(): number | undefined {
        return this._pizzaId;
    }

    set pizzaId(value: number | undefined) {
        this._pizzaId = value;
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
    }

    get description(): string | undefined {
        return this._description;
    }

    set description(value: string | undefined) {
        this._description = value;
    }

    get pizzaSizeIds(): number[] | undefined {
        return this._pizzaSizeIds;
    }

    set pizzaSizeIds(value: number[] | undefined) {
        this._pizzaSizeIds = value;
    }

    get imageUrl(): string | undefined {
        return this._imageUrl;
    }

    set imageUrl(value: string | undefined) {
        this._imageUrl = value;
    }
}
