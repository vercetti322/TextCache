/* eslint-disable react/prop-types */
import { Box, Input, Button, useClipboard } from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';

function CopyableUrl({ url }) {
  const { hasCopied, onCopy } = useClipboard(url);
  return (
    <Box display="flex" alignItems="center">
      <Input
        value={url}
        isReadOnly
        variant="filled"
        width="300px"
        size="md"
        flex="1"
        mr="2"
      />
      <Button
        onClick={onCopy}
        leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
        colorScheme={hasCopied ? 'green' : 'teal'}
        variant="solid"
        size="md"
      >
        {hasCopied ? 'Copied' : 'Copy'}
      </Button>
    </Box>
  );
}

export default CopyableUrl;
