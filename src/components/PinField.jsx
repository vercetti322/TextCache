/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PinInput, Text, PinInputField, HStack } from '@chakra-ui/react';
import { useState } from 'react';

function PinField({ passPinFromField }) {
  const arr = new Array(5).fill(null);
  const [pin, setPin] = useState('');

  const handleChange = (value) => {
    setPin(value);
    passPinFromField(value);
  };
  return (
    <div>
      <Text fontSize="18px" fontWeight="bold">
        Enter Pin
      </Text>
      <HStack spacing={4}>
        <PinInput
          placeholder=" "
          focusBorderColor="teal.500"
          onChange={handleChange}
        >
          {arr.map((_, idx) => (
            <PinInputField key={idx} />
          ))}
        </PinInput>
      </HStack>
    </div>
  );
}

export default PinField;
