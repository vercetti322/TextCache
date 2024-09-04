import { Heading, Flex, Center, Text } from '@chakra-ui/react';
import PasteModal from './components/PasteModal';

function App() {
  const getPasteObject = (pasteObject) => {
    console.log(pasteObject);
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
        <PasteModal exportPasteObject={getPasteObject} />
      </Center>
    </Flex>
  );
}

export default App;
