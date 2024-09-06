import { Heading, Flex, Center, Text } from '@chakra-ui/react';
import PasteModal from './components/PasteModal';
import { useState } from 'react';
import CopyLink from './components/CopyLink';
import { encryptWithPin, decryptWithPin } from './scripts/crypto.js';

function App() {
  let exportObject;

  const [hasObject, setHasObject] = useState(false);

  const getPasteObject = (pasteObject) => {
    exportObject = encryptWithPin(
      pasteObject.pasteText,
      (pasteObject.password = '9999999')
    );
    console.log(exportObject);
    console.log(
      decryptWithPin(
        exportObject.encryptedContent,
        exportObject.iv,
        pasteObject.password === '' ? '9999999' : pasteObject.password
      )
    );
    setHasObject(true);
  };

  const handleDone = () => {
    setHasObject(false);
  };

  return (
    <Flex alignItems="center" flexDirection="column" my="30px">
      <Center mt="10px">
        <Heading fontSize="75px">
          Text<span style={{ color: '#008080' }}>cache</span>
        </Heading>
      </Center>
      <Center mt="20px">
        <Text fontSize="23px" maxWidth="540px" textAlign="center">
          A simple, secure platform for{' '}
          <span style={{ color: '#006666' }}>caching</span> and{' '}
          <span style={{ color: '#006666' }}>sharing</span> text snippets with
          ease.
        </Text>
      </Center>
      <Center mt="25px">
        <PasteModal
          exportPasteObject={getPasteObject}
          homeHasObject={hasObject}
        />
      </Center>
      {hasObject && <CopyLink onClose={handleDone} />}
    </Flex>
  );
}

export default App;
