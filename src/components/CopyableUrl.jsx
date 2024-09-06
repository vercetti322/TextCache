/* eslint-disable react/prop-types */
import { Box, Input, Button, useClipboard } from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';

function CopyableUrl({ url }) {
  const { hasCopied, onCopy } = useClipboard(url);

  return (
    <Box display="flex" alignItems="center" position="relative">
      <Input
        value={url}
        isReadOnly
        variant="filled"
        focusBorderColor="teal.500"
        width="300px"
        fontWeight="bold"
        size="md"
        colorScheme="blackAlpha"
        flex="1"
        mr="2"
      />
      <Button
        onClick={onCopy}
        leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
        colorScheme={hasCopied ? 'green' : 'teal'}
        variant="solid"
        size="md"
        mr="2"
      >
        {hasCopied ? 'Copied' : 'Copy'}
      </Button>
    </Box>
  );
}

export default CopyableUrl;
