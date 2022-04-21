import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  Stack,
} from '@chakra-ui/react';
import { CreatePersonPayload } from '../../api/types';
import PersonsUtils, { EMAIL_REGEX } from './util';
import { useAddPerson } from './queries';

type AddPersonModalProps = {
  isAddPersonOpen: boolean;
  onAddPersonClose: () => void;
};

function AddPersonModal({ isAddPersonOpen, onAddPersonClose }: AddPersonModalProps) {
  const [personForm, setPersonForm] = useState<CreatePersonPayload>({ name: '' });
  const [isPersonNameValid, setIsPersonNameValid] = useState(true);
  const [isPersonEmailValid, setIsPersonEmailValid] = useState(true);
  const [isPersonFormValid, setIsPersonFormValid] = useState(false);

  const addPerson = useAddPerson();

  useEffect(() => {
    const isNameValid = personForm.name !== '';
    const isEmailValid = personForm.email ? PersonsUtils.isFieldValid(personForm.email, EMAIL_REGEX) : true;

    setIsPersonEmailValid(isEmailValid);
    setIsPersonNameValid(isNameValid);
    setIsPersonFormValid(isNameValid && isEmailValid);
  }, [personForm.name, personForm.email, personForm.phone]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    if (isPersonFormValid && personForm) {
      addPerson.mutate(personForm, { onSuccess: () => onAddPersonClose() });
    }
  };

  return (
    <Modal isOpen={isAddPersonOpen} onClose={onAddPersonClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth="1px" borderBottomColor="grey.500" bg="blackAlpha.100">
          Add Person
        </ModalHeader>
        <ModalCloseButton disabled={addPerson.isLoading} />
        <ModalBody>
          <Stack spacing={4} py={8}>
            <FormControl isInvalid={!isPersonNameValid} isRequired>
              <FormLabel htmlFor="name" fontWeight="bold">
                Name
              </FormLabel>
              <Input
                id="name"
                type="text"
                name="name"
                value={personForm.name}
                placeholder="Enter name"
                onChange={onFieldChange}
              />
              {!isPersonNameValid && <FormErrorMessage>A Name is required.</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!isPersonEmailValid}>
              <FormLabel htmlFor="email" fontWeight="bold">
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                value={personForm.email}
                placeholder="your-email@example.com"
                onChange={onFieldChange}
              />
              {!isPersonEmailValid && <FormErrorMessage>Email format is incorrect.</FormErrorMessage>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone" fontWeight="bold">
                Phone
              </FormLabel>
              <Input
                id="phone"
                type="phone"
                name="phone"
                value={personForm.phone}
                placeholder="Phone number"
                onChange={onFieldChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="groups" fontWeight="bold">
                Groups
              </FormLabel>
              <Input
                id="groups"
                name="groups"
                type="text"
                value={personForm.groups}
                placeholder="group"
                onChange={onFieldChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="assistant" fontWeight="bold">
                Assistant
              </FormLabel>
              <Input
                id="assistant"
                name="assistant"
                type="text"
                placeholder="assistant name"
                value={personForm.assistant}
                onChange={onFieldChange}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderTopColor="grey.500" bg="blackAlpha.100">
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            disabled={!isPersonFormValid}
            isLoading={addPerson.isLoading}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddPersonModal;
