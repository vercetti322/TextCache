/* eslint-disable react/prop-types */
import CopyableUrl from './CopyableUrl';
import {
  Center,
  Box,
  Text,
  Heading,
  Spacer,
  Flex,
  Button,
} from '@chakra-ui/react';

function CopyLink({ onClose, pathUrl }) {
  return (
    <Box bg="gray.100" mt="20px" height="210px" borderRadius="lg">
      <Flex direction="row">
        <Heading as="h3" ml="130px" mt="17px" mb="-3px">
          Text<span style={{ color: '#008080' }}>cache</span>
        </Heading>
        <Spacer />
        <Button
          onClick={onClose}
          mt="10px"
          mx="10px"
          colorScheme="teal"
          height="32px"
        >
          x
        </Button>
      </Flex>
      <Center mt="20px">
        <Text fontSize="20px" maxWidth="450px" textAlign="center">
          Your paste is ready! Use the below link to access the cache.
        </Text>
      </Center>
      <Center mt="15px">
        <CopyableUrl url={`localhost:5173/${pathUrl}`}></CopyableUrl>
      </Center>
    </Box>
  );
}

export default CopyLink;
