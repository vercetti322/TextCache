import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Flex, Center, Heading } from '@chakra-ui/react';
import PasteViewer from './components/PasteViewer';

function PastePage() {
  const { hash } = useParams();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await axios.get(`${url}/api/pastes/${hash}`);
        setPaste(response.data);
      } catch (error) {
        console.error('Error fetching paste:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [hash]);

  if (loading) {
    return (
      <Center>
        <Heading>Loading..</Heading>
      </Center>
    );
  }

  if (hash.length < 6) {
    return <Navigate to="/error" replace />;
  }

  return (
    <Flex alignItems="center" flexDirection="column" my="30px">
      <Center mt="10px">
        <Heading fontSize="50px">
          Text<span style={{ color: '#008080' }}>cache</span>
        </Heading>
      </Center>
      <Center
        mt="15px"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.45)"
        borderRadius={6}
        py="6"
        px="1"
      >
        <PasteViewer pasteObject={paste} />
      </Center>
    </Flex>
  );
}

export default PastePage;
