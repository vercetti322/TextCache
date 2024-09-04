/* eslint-disable no-unused-vars */
import { Heading, Button, Flex, Center, Text } from '@chakra-ui/react';
import PasteModal from './components/PasteModal';
import { useState } from 'react';
import CopyableUrl from './components/CopyableUrl';

function App() {
  let exportObject = {};

  const [hasObject, setHasObject] = useState(false);

  const getPasteObject = (pasteObject) => {
    exportObject = pasteObject;
    setHasObject(true);
  };

  const handleDone = () => {
    setHasObject(false);
  };

  return (
    <Flex alignItems="center" flexDirection="column" my="30px">
      <Center mt="15px">
        <Heading fontSize="75px">
          Text<span style={{ color: '#008080' }}>cache</span>
        </Heading>
      </Center>
      <Center mt="30px">
        <Text fontSize="23px" maxWidth="540px" textAlign="center">
          A simple, secure platform for{' '}
          <span style={{ color: '#006666' }}>caching</span> and{' '}
          <span style={{ color: '#006666' }}>sharing</span> text snippets with
          ease.
        </Text>
      </Center>
      <Center mt="35px">
        <PasteModal
          exportPasteObject={getPasteObject}
          homeHasObject={hasObject}
        />
      </Center>
      {hasObject && (
        <div>
          <Center mt="20px">
            <Text fontSize="20px" maxWidth="450px" textAlign="center">
              Your paste is ready! Use the below link to access the cache.
            </Text>
          </Center>
          <Center mt="15px">
            <CopyableUrl
              url={`localhost:5173/${typeof exportObject}`}
            ></CopyableUrl>
          </Center>
        </div>
      )}
    </Flex>
  );
}

export default App;
