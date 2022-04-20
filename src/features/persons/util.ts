import { ContactInfo } from '../../api/types';

export const PHONE_REGEX =
  /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[-. \\/]?)?((?:\(?\d{1,3}\)?[-. \\/]?){0,})(?:[-. \\/]?(?:#|ext\.?|extension|x)[-. \\/]?(\d+))?$/i;

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const getPrimaryValue = (contacts: ContactInfo[]) => contacts.find((contact) => contact.primary === true)?.value;

const isFieldValid = (value: string, pattern: RegExp) => pattern.test(value);

const PersonsUtils = { getPrimaryValue, isFieldValid };

export default PersonsUtils;
