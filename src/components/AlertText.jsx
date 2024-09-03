/* eslint-disable react/prop-types */
import { Alert, AlertIcon } from '@chakra-ui/react';

function AlertText({ text }) {
  return (
    <Alert status="error" maxWidth="800px" ml="40px" mt="10px" height="35px">
      <AlertIcon />
      {text}
    </Alert>
  );
}

export default AlertText;
