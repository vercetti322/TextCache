import { Stack, Flex, Skeleton } from '@chakra-ui/react';

function SkeletonBox() {
  return (
    <Stack padding={4} spacing={3}>
      <Skeleton height="30px" />
      <Skeleton height="30px" />
      <Flex width="100%" justify="space-between">
        <Skeleton height="35px" flex="8" mr={2}/>
        <Skeleton height="35px" flex="2"/>
      </Flex>
    </Stack>
  );
}

export default SkeletonBox;
