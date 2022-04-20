import { ContactInfo } from '../../api/types';

const getPrimaryValue = (contacts: ContactInfo[]) => contacts.find((contact) => contact.primary === true)?.value;

const PersonsUtils = { getPrimaryValue };

export default PersonsUtils;
