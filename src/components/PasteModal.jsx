/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/react';

import { LinkIcon } from '@chakra-ui/icons';
import EncryptModal from './EncryptModal';
import SmartText from './SmartText';
import { useState } from 'react';

function PasteModal({ exportPasteObject, homeHasObject }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pinCode, setPinCode] = useState('');

  const getPin = (pin) => {
    setPinCode(pin);
  };

  const [code, setPasteCode] = useState('');

  const getPasteText = (text) => {
    setPasteCode(text);
  };

  const pasteObject = Object.create({
    pasteText: code,
    password: pinCode,
  });

  const handleSubmit = () => {
    exportPasteObject(pasteObject);
    setPinCode('');
    onClose();
  };

  return (
    <>
      <Button variant="solid" isDisabled={homeHasObject} colorScheme="teal" size="lg" onClick={onOpen}>
        Paste your text
      </Button>
      <Modal
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isOpen={isOpen}
        colorScheme="teal"
        onClose={onClose}
        size="4xl"
        height="fit-content"
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize="30px">
            Text<span style={{ color: '#008080' }}>cache</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SmartText passTextToPasteModal={getPasteText} />
          </ModalBody>
          <ModalFooter justifyContent="center" gap="12px">
            <Button
              leftIcon={<LinkIcon />}
              variant="solid"
              colorScheme="teal"
              onClick={handleSubmit}
              isDisabled={code === ''}
            >
              Share
            </Button>
            <EncryptModal passPinToPasteModal={getPin} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PasteModal;
