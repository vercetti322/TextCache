/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Heading, Flex, Center, Text } from '@chakra-ui/react';
import PasteModal from './components/PasteModal.jsx';
import { useState, useEffect, useRef } from 'react';
import CopyLink from './components/CopyLink.jsx';
import { encryptWithPin } from './scripts/crypto.js';
import Footer from './components/Footer.jsx';
import axios from 'axios';

function HomePage() {
  let exportObject;
  const url = import.meta.env.VITE_API_URL;
  const [hasObject, setHasObject] = useState(false);
  const [pathUrl, setPathUrl] = useState('');
  const [isBackendAlive, setIsBackendAlive] = useState(false);
  const intervalRef = useRef(null);

  const checkBackendStatus = async () => {
    try {
      const response = await axios.get(`${url}/health`);
      if (response.status === 200) {
        setIsBackendAlive(true);
      } else {
        setIsBackendAlive(false);
      }
    } catch (error) {
      setIsBackendAlive(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkBackendStatus();

    // Polling interval: check every 30 seconds
    intervalRef.current = setInterval(() => {
      checkBackendStatus();
    }, 7000); // 7 seconds

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getPasteObject = (pasteObject) => {
    exportObject = encryptWithPin(
      pasteObject.pasteText,
      pasteObject.password === '' ? '999999' : pasteObject.password
    );

    exportObject.protected = pasteObject.password !== '';

    // Post the pasteObject JSON to the backend
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
    <Flex direction="column" minHeight="100vh">
      <Flex direction="column" flex="1" alignItems="center" my="30px">
        <Center mt="30px">
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
        {!isBackendAlive && (
          <Center mt="25px">
            <Text fontSize="20px" color="red">
              Backend is loading! Please wait...
            </Text>
          </Center>
        )}
      </Flex>
      <Footer />
    </Flex>
  );
}

export default HomePage;
