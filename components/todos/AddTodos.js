/* eslint-disable react/no-children-prop */
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { MdRadioButtonUnchecked } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';

import styles from './../../styles/Home.module.css';

import { db } from './../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const AddTodos = () => {
  const [todo, setTodo] = useState({ title: '' });
  const toast = useToast();
  const toastIdRef = useRef();
  const [submited, setSubmited] = useState(false);
  const { colorMode } = useColorMode();
  const inputRef = useRef();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todo.title !== '') {
      setSubmited(true);
      const collectionRef = collection(db, 'todos');
      const docRef = await addDoc(collectionRef, {
        ...todo,
        timestamp: serverTimestamp(),
        completed: false,
      });
      setTodo({ title: '' });

      showToast('success', 'A new task has been successfully added');
      setSubmited(false);
    }
  };

  function showToast(type, msg) {
    toastIdRef.current = toast({
      title: msg,
      status: type,
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  }

  return (
    <Stack ref={inputRef}>
      <InputGroup>
        <InputLeftElement
          paddingTop={21}
          pointerEvents="none"
          children={
            <MdRadioButtonUnchecked color="hsl(236, 9%, 61%, 0.36)" size={24} />
          }
        />
        <Input
          boxShadow="xl"
          _focus={false}
          placeholder="Add todo ..."
          size="lg"
          className={styles.input}
          border="hsl(235, 24%, 19%)"
          backgroundColor={
            colorMode === 'light' ? '#fafafa' : 'hsl(235, 24%, 19%)'
          }
          h={63}
          fontSize={22}
          textColor="#81A9FB"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <InputRightElement
          paddingTop={21}
          children={
            <Button
              onClick={handleAddTodo}
              isLoading={submited}
              rightIcon={<AiOutlineCheck />}
              colorScheme="#718fd1"
              color="#718fd1"
              variant="outline"
              px={15}
              size="md"
              marginLeft={-20}
              disabled={todo.title.length < 5}
            >
              Add
            </Button>
          }
        />
      </InputGroup>
    </Stack>
  );
};

export default AddTodos;
