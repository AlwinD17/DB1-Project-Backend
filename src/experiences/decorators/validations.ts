import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  // Valida que la fecha de inicio sea posterior a la fecha actual
  @ValidatorConstraint({ async: false })
  export class IsStartDateValidConstraint implements ValidatorConstraintInterface {
    validate(startDate: Date, args: ValidationArguments): boolean {
      return startDate > new Date(); // Valida que la fecha de inicio sea futura
    }
  
    defaultMessage(args: ValidationArguments): string {
      return 'La fecha de inicio debe ser posterior a la fecha actual.';
    }
  }
  
  // Decorador para la fecha de inicio
  export function IsStartDateValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsStartDateValidConstraint,
      });
    };
  }
  
  // Valida que la fecha final sea posterior a la fecha de inicio
  @ValidatorConstraint({ async: false })
  export class IsEndDateValidConstraint implements ValidatorConstraintInterface {
    validate(endDate: Date, args: ValidationArguments): boolean {
      const [relatedPropertyName] = args.constraints;
      const startDate = (args.object as any)[relatedPropertyName];
      return endDate > startDate; // Valida que la fecha final sea posterior a la fecha de inicio
    }
  
    defaultMessage(args: ValidationArguments): string {
      return 'La fecha final debe ser posterior a la fecha de inicio.';
    }
  }
  
  // Decorador para la fecha final
  export function IsEndDateValid(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [property],
        validator: IsEndDateValidConstraint,
      });
    };
  }
  