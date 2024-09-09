import { Box, Container, HStack, Link, Text, Icon } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" py={4} borderTopWidth={1} borderTopColor="gray.200" bg="gray.50">
      <Container maxW="container.lg" centerContent>
        <HStack spacing={4} justify="center" mb={4}>
          <Link href="https://github.com/vercetti322/TextCache.git" isExternal>
            <HStack spacing={2}>
              <Icon as={FaGithub} boxSize={6} />
              <Text>GitHub</Text>
            </HStack>
          </Link>
        </HStack>
        <Text textAlign="center" fontSize="sm" color="gray.600">
          &copy; {new Date().getFullYear()} Licensed under the MIT License.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
