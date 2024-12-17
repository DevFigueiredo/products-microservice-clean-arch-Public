
export interface IValidator<T> {
    validate(data: T): T;
    validateSafe(data: T): T;
}

export namespace IValidator {
    export interface ISchema<T> {
        parse(data: T): T;
        safeParse(data: T): any;
    }
}