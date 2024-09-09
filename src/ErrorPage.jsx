// ErrorPage.jsx
import { Center, Text, Heading, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Flex direction="column" align="center" justify="center" p={4}>
      <Center mt="30px">
        <Heading fontSize="75px">
          Text<span style={{ color: '#008080' }}>cache</span>
        </Heading>
      </Center>
      <Center mt={4}>
        <Text fontSize="40px" color="red.500">
          Error: Invalid hash or page not found.
        </Text>
      </Center>
      <Center mt={6}>
        <Button as={Link} to="/" colorScheme="teal" size="lg">
          Go to Homepage
        </Button>
      </Center>
    </Flex>
  );
};

export default ErrorPage;
