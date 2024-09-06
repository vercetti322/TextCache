import CopyableUrl from './CopyableUrl';
import { Center, Box, Text } from '@chakra-ui/react';

function CopyLink() {
  return (
    <Box bg="teal.100" height="160px" borderRadius="lg" p="10px">
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
    </Box>
  );
}

export default CopyLink;
