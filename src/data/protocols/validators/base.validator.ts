import { IValidator } from './validator.interface';
import { BadRequestException, Logger } from '@nestjs/common';

export abstract class BaseValidator<T> implements IValidator<T> {
    protected abstract schema: IValidator.ISchema<T>;

    validate(data: T): T {
        try {
            return this.schema.parse(data);
        } catch (error) {
            const errorMessages = this.formatErrors(error);
            throw new BadRequestException(errorMessages, { description: 'Validation Error' });
        }
    }

    validateSafe(data: T): T {
        try {
            return this.schema.safeParse(data);
        } catch (error) {
            const errorMessages = this.formatErrors(error);
            throw new BadRequestException(errorMessages, { description: 'Validation Error' });
        }
    }

    private formatErrors(error: any): string {
        Logger.warn(`Validation Error ${error?.errors?.length ? JSON.stringify(error?.errors) : error.message}`)
        return error.errors || error?.message
    }
}
