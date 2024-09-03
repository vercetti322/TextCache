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

function PasteModal({ passPinHome }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePin = (pin) => {
    if (pin !== 'null' && pin.length === 5) {
      passPinHome(pin);
    }
  };
  return (
    <>
      <Button variant="solid" colorScheme="teal" size="lg" onClick={onOpen}>
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
            <SmartText />
          </ModalBody>
          <ModalFooter justifyContent="center" gap="12px">
            <Button
              leftIcon={<LinkIcon />}
              variant="solid"
              colorScheme="teal"
              onClick={onClose}
            >
              Share
            </Button>
            <EncryptModal passPin={handlePin} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PasteModal;
