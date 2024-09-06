/* eslint-disable no-unused-vars */
import { Heading, Flex, Center, Text, Box, Skeleton } from '@chakra-ui/react';
import PasteModal from './components/PasteModal';
import { useState, useEffect } from 'react';
import CopyLink from './components/CopyLink';
import SkeletonBox from './components/SkeletonBox';

function App() {
  let exportObject = {};

  const [hasObject, setHasObject] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state to manage skeleton loading

  const getPasteObject = (pasteObject) => {
    exportObject = pasteObject;
    setHasObject(true);
    setIsLoading(true); // Trigger skeleton when hasObject is true
  };

  useEffect(() => {
    if (hasObject) {
      const timer = setTimeout(() => {
        setIsLoading(false); // After 3 seconds, stop showing skeleton
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [hasObject]);

  const handleDone = () => {
    setHasObject(false);
    setIsLoading(false);
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
        <Box mt="30px" width="80%" maxWidth="470px">
          {isLoading ? <SkeletonBox /> : <CopyLink />}
        </Box>
      )}
    </Flex>
  );
}

export default App;
