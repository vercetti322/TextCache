import { Heading, Flex, Center, Text } from '@chakra-ui/react';
import PasteModal from './components/PasteModal.jsx';
import { useState } from 'react';
import CopyLink from './components/CopyLink.jsx';
import { encryptWithPin } from './scripts/crypto.js';
import axios from 'axios';

function HomePage() {
  let exportObject;

  const [hasObject, setHasObject] = useState(false);

  const [pathUrl, setPathUrl] = useState('');

  const getPasteObject = (pasteObject) => {
    exportObject = encryptWithPin(
      pasteObject.pasteText,
      pasteObject.password === '' ? '999999' : pasteObject.password
    );

    if (pasteObject.password === '') {
      exportObject.protected = false;
    } else {
      exportObject.protected = true;
    }

    // post the pasteObject JSON to redis
    const postUrl = 'http://localhost:8080/api/pastes/new';

    axios
      .post(postUrl, exportObject, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setPathUrl(response.data);
        } else {
          console.error('Unexpected status code:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

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
      {hasObject && pathUrl && (
        <CopyLink onClose={handleDone} pathUrl={pathUrl} />
      )}
    </Flex>
  );
}

export default HomePage;
