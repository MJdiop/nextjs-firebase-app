import { Container } from '@chakra-ui/react';
import { Header } from './index';

const Layout = ({ children }) => {
  return (
    <Container maxW="container.md">
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
