import Head from 'next/head';
import { Box, Flex, Text, Spacer, useColorMode } from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import AddTodos from './todos/AddTodos';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>
          Todo App Created with NextJS and Chakra UI, Disign: Inspired By
          frontend mentor{' '}
        </title>
        <meta
          name="Todo App React NextJS Javascript"
          content="Todo App Created with NextJS and Chakra UI, Disign: Inspired By
          frontend mentor challenge, Developed by MJdiop"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        bg="transparant"
        w="100%"
        paddingTop={10}
        paddingBottom={10}
        marginBottom={5}
      >
        <Flex justifyContent="center" alignItems="center">
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="5xl"
            fontWeight="extrabold"
            as="h1"
            letterSpacing={10}
          >
            TODO
          </Text>

          <Spacer />
          <Box p={0} fontSize={22} cursor="pointer" onClick={toggleColorMode}>
            {colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </Box>
        </Flex>
      </Box>
      <Box marginBottom={70}>
        <AddTodos />
      </Box>
    </>
  );
};

export default Header;
