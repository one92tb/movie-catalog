import validateDetails from './validationDetails';

const validate = (url) => validateDetails(url).find((validate) => validate.condition);

export default validate;
