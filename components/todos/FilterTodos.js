import { Box, Flex, useColorMode } from '@chakra-ui/react';

import styles from '../../styles/Home.module.css';

const FilterTodos = ({
  todos,
  handleShowAllTodo,
  handleShowActiveTodo,
  handleShowCompletedTodo,
  handleRemoveClearCompleted,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const itemsLeft = todos.filter((todo) => todo.completed === false);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      px={6}
      paddingBottom={6}
      wrap="wrap"
    >
      <Box className={styles.filterItemsLength}>
        {itemsLeft.length} items left
      </Box>

      <Box
        cursor="pointer"
        className={
          colorMode === 'light' ? styles.filterLigth : styles.filterDark
        }
        onClick={() => handleShowAllTodo(todos)}
      >
        All
      </Box>

      <Box
        cursor="pointer"
        className={
          colorMode === 'light' ? styles.filterLigth : styles.filterDark
        }
        onClick={() => handleShowActiveTodo(todos)}
      >
        Active
      </Box>

      <Box
        cursor="pointer"
        className={
          colorMode === 'light' ? styles.filterLigth : styles.filterDark
        }
        onClick={() => handleShowCompletedTodo(todos)}
      >
        Completed
      </Box>

      <Box
        cursor="pointer"
        className={
          colorMode === 'light' ? styles.filterLigth : styles.filterDark
        }
        onClick={() => handleRemoveClearCompleted(todos)}
      >
        Clear Completed
      </Box>
    </Flex>
  );
};

export default FilterTodos;
