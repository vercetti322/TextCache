/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { LockIcon } from '@chakra-ui/icons';
import PinField from './PinField';
import { useState } from 'react';

function EncryptModal({ passPinToPasteModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pinOne, setPinOne] = useState('');

  const handlePinOneChange = (newPin) => {
    setPinOne(newPin);
  };

  const [pinTwo, setPinTwo] = useState('');

  const handlePinTwoChange = (newPin) => {
    setPinTwo(newPin);
  };

  const [unmatched, setUnmatched] = useState(false);
  const handleSubmit = () => {
    if (pinOne.length === 5 && pinTwo.length === 5) {
      if (pinOne !== pinTwo) {
        setUnmatched(true);
      } else {
        setUnmatched(false);
        passPinToPasteModal(pinOne);
        onClose();
      }
    }
  };

  return (
    <>
      <Button
        leftIcon={<LockIcon />}
        variant="outline"
        colorScheme="teal"
        onClick={onOpen}
      >
        Protect
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay color="teal" />
        <ModalContent width="300px">
          <ModalHeader textAlign="center" fontSize="24px">
            Text<span style={{ color: '#008080' }}>cache</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PinField passPinFromField={handlePinOneChange} />
            <br />
            <PinField passPinFromField={handlePinTwoChange} />
            {unmatched && <p style={{ color: 'red' }}>PINs do not match!</p>}
          </ModalBody>

          <ModalFooter mr="3px" justifyContent="center">
            <Button colorScheme="teal" onClick={handleSubmit}>
              Set PIN
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EncryptModal;
