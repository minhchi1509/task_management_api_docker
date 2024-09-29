/* eslint-disable no-unsafe-optional-chaining */
import { registerDecorator, ValidationOptions } from 'class-validator';
import dayjs from 'dayjs';

export const IsAfterDateTime = (
  compareValue: { value?: Date | string; relatedProperty?: string },
  validationOptions?: ValidationOptions
) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAfterDateTime',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Date, arg) {
          if (value) {
            if (compareValue.value) {
              return dayjs(value).isAfter(dayjs(compareValue.value));
            }
            if (compareValue.relatedProperty) {
              if (
                !Object.keys(arg?.object || {}).includes(
                  compareValue.relatedProperty
                )
              ) {
                throw new Error(
                  "Key doesn't exist in object in IsAfterDateTime validator"
                );
              }
              const relatedValue = (arg?.object as any)[
                compareValue.relatedProperty
              ];
              return dayjs(value).isAfter(dayjs(relatedValue));
            }
          }
          return false;
        },
        defaultMessage: (arg) => {
          if (compareValue.value) {
            return `${propertyName} must be after ${compareValue.value}`;
          }
          return `${propertyName} must be after ${compareValue.relatedProperty}`;
        }
      }
    });
  };
};
