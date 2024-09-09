/* eslint-disable react/prop-types */
import { Editor } from '@monaco-editor/react';
import hljs from 'highlight.js';
import { useState, useEffect } from 'react';
import AlertText from './AlertText';
import { decryptWithPin } from '../scripts/crypto';
import { PinInput, PinInputField, HStack, Heading, useToast } from '@chakra-ui/react';

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
          if (pin.length === 5) { // Ensure PIN is 5 digits
            value = decryptWithPin(value.encryptedContent, value.iv, pin);
            if (value === null) { // Assuming empty string means decryption failed
              toast({
                title: 'PIN Incorrect',
                description: 'The PIN you entered is incorrect. Please try again.',
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

  return (
    <>
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
          height="320px"
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
      {limitWarning ? <AlertText text={alertMessage} /> : null}
    </>
  );
}

export default PasteViewer;
