import { Heading, Flex, Center, Text } from '@chakra-ui/react';
import PasteModal from './components/PasteModal';
import { useState } from 'react';

function App() {
  const [showLink, setShowLink] = useState(false);
  const displayPin = (pin) => {
    if (pin !== 'null' && pin.length === 5) {
      setShowLink(true);
    }
  };
  return (
    <Flex alignItems="center" flexDirection="column">
      <Center mt="75px">
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
        <PasteModal passPinHome={displayPin} />
      </Center>
      {showLink && (
        <Center mt="25px">
          <Text>Your link is ready!</Text>
        </Center>
      )}
    </Flex>
  );
}

export default App;
