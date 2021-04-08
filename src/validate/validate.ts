import validateDetails from './validationDetails';

type ValidationResult = {
    condition: boolean,
    link: string,
    platform: string,
  }

const validate = (url: string):ValidationResult | undefined => validateDetails(url)
  .find((validate: ValidationResult) => validate.condition);

export default validate;
