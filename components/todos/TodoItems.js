import {
  List,
  ListItem,
  Flex,
  Box,
  Spacer,
  Text,
  useColorMode,
  Spinner,
} from '@chakra-ui/react';
import moment from 'moment';
import { MdAccessTimeFilled, MdRadioButtonUnchecked } from 'react-icons/md';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

import styles from '../../styles/Home.module.css';
import FilterTodos from './FilterTodos';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';

const TodoItems = ({
  todos,
  handleCompleted,
  handleRemove,
  handleShowAllTodo,
  handleShowActiveTodo,
  handleShowCompletedTodo,
  handleRemoveClearCompleted,
}) => {
  const { colorMode } = useColorMode();

  return todos.length === 0 ? (
    <Flex justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="hsl(280, 87%, 65%)"
        color="hsl(192, 100%, 67%)"
        size="xl"
      />
    </Flex>
  ) : (
    <List
      spacing={8}
      bg={colorMode === 'light' ? 'hsl(0, 0%, 98%)' : 'hsl(235, 24%, 19%)'}
      borderRadius={6}
      boxShadow="2xl"
      mb={10}
    >
      <Droppable droppableId="todo">
        {(provided, snapshot) => (
          <Box ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable
                draggableId={todo.id.toString()}
                key={todo.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Flex
                      cursor="grabbing"
                      borderBottom="1px solid #80808061"
                      my={10}
                      p={6}
                      mt={-8}
                      backgroundColor={snapshot.isDragging ? '#00000040' : ''}
                    >
                      <Box>
                        <Flex justifyContent="flex-start" alignItems="center">
                          <Box
                            marginRight={2}
                            cursor="pointer"
                            onClick={() => handleCompleted(todo)}
                          >
                            {todo.completed ? (
                              <BsFillCheckCircleFill
                                size={24}
                                color="#81A9FB"
                              />
                            ) : (
                              <MdRadioButtonUnchecked
                                size={26}
                                className={styles.hover}
                              />
                            )}
                          </Box>
                          <Text fontSize={22} as={todo.completed ? 'del' : ''}>
                            {todo.title}
                          </Text>{' '}
                          <br />
                        </Flex>

                        <Flex marginTop={4} alignItems="center">
                          {' '}
                          <MdAccessTimeFilled color="#4299e199" size={18} />
                          <Box
                            as="span"
                            fontSize={14}
                            fontStyle="italic"
                            marginLeft={2}
                          >
                            {moment(todo.timestamp).format(
                              'dddd DD MMMM, YYYY'
                            )}
                          </Box>
                        </Flex>
                      </Box>

                      <Spacer />

                      <Box>
                        <AiOutlineClose
                          cursor="pointer"
                          size={26}
                          className={styles.hoverRemove}
                          onClick={() => handleRemove(todo.id)}
                        />
                      </Box>
                    </Flex>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      <FilterTodos
        todos={todos}
        handleShowAllTodo={handleShowAllTodo}
        handleShowActiveTodo={handleShowActiveTodo}
        handleShowCompletedTodo={handleShowCompletedTodo}
        handleRemoveClearCompleted={handleRemoveClearCompleted}
      />
    </List>
  );
};

export default TodoItems;
