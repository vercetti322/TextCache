/* eslint-disable react/prop-types */
import { Editor } from '@monaco-editor/react';
import hljs from 'highlight.js';
import { useState, useEffect } from 'react';
import AlertText from './AlertText';
import { decryptWithPin } from '../scripts/crypto';
import {
  PinInput,
  PinInputField,
  HStack,
  Heading,
  useToast,
  Button,
  Flex,
} from '@chakra-ui/react';

import { CopyIcon, DownloadIcon } from '@chakra-ui/icons';

function PasteViewer({ pasteObject }) {
  const [language, setLanguage] = useState('plaintext');
  const [code, setCode] = useState('');
  const alertMessage = `You have exceeded 5000 line count.`;
  const [limitWarning, setLimitWarning] = useState(false);
  const [pinClear, setPinClear] = useState(false);
  const [decryptionSuccessful, setDecryptionSuccessful] = useState(false);
  const [pin, setPin] = useState('');
  const arr = new Array(5).fill(null);
  const toast = useToast();

  useEffect(() => {
    if (pasteObject) {
      const detectLanguage = async (value) => {
        if (value.protected === false) {
          setPinClear(true);
          setDecryptionSuccessful(true);
          value = decryptWithPin(value.encryptedContent, value.iv, '999999');
        } else {
          if (pin.length === 5) {
            // Ensure PIN is 5 digits
            value = decryptWithPin(value.encryptedContent, value.iv, pin);
            if (value === null) {
              // Assuming empty string means decryption failed
              toast({
                title: 'PIN Incorrect',
                description:
                  'The PIN you entered is incorrect. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
              setPinClear(false);
              setDecryptionSuccessful(false);
              return;
            } else {
              setPinClear(true);
              setDecryptionSuccessful(true);
            }
          }
        }
        value = limitLines(value);
        setCode(value);
        const detectedLang = hljs.highlightAuto(value).language;
        setLanguage(detectedLang || 'plaintext');
      };
      detectLanguage(pasteObject);
    }
  }, [pasteObject, pin, toast]);

  const handlePinChange = (value) => {
    if (value.length === 5) {
      setTimeout(() => {
        setPin(value);
        setDecryptionSuccessful(false);
      }, 1000);
    }
  };

  const limitLines = (code) => {
    if (typeof code !== 'string') {
      console.error('Expected a string but got:', typeof code);
      return ''; // or some default value
    }

    const lines = code.split(/\r?\n/);
    if (lines.length > 5000) {
      setLimitWarning(true);
      return lines.slice(0, 5000).join('\n');
    } else {
      setLimitWarning(false);
    }

    return code;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Code Copied',
      description: 'The code has been copied to your clipboard.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Code Downloaded',
      description: 'The code has been downloaded as a file.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column">
      {!pinClear && (
        <div
          style={{
            width: '300px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Heading fontSize={28}>Enter PIN</Heading>
          <HStack spacing={4}>
            <PinInput
              placeholder=" "
              focusBorderColor="teal.500"
              onChange={handlePinChange}
            >
              {arr.map((_, idx) => (
                <PinInputField key={idx} />
              ))}
            </PinInput>
          </HStack>
        </div>
      )}
      {pinClear && decryptionSuccessful && (
        <Editor
          height="305px"
          width="900px"
          key={code}
          value={code}
          language={language}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            fontSize: 17.5,
            automaticLayout: true,
            wordWrap: 'on',
            wrappingIndent: 'same',
            scrollBeyondLastLine: false,
          }}
        />
      )}
      {pinClear && decryptionSuccessful && (
        <HStack spacing={4} justify="center" mt={3}>
          <Button
            leftIcon={<CopyIcon />}
            colorScheme="teal"
            onClick={handleCopy}
          >
            Copy
          </Button>
          <Button
            leftIcon={<DownloadIcon />}
            colorScheme="teal"
            onClick={handleDownload}
          >
            Download
          </Button>
        </HStack>
      )}
      {limitWarning ? <AlertText text={alertMessage} /> : null}
    </Flex>
  );
}

export default PasteViewer;
