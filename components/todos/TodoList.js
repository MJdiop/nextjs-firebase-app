import { useEffect, useRef, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from './../../firebase';
import TodoItems from './TodoItems';
import { DragDropContext } from 'react-beautiful-dnd';
import AlertDialogConfirm from '../../utils/AlertDialogConfirm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // UTILS
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const cancelRef = useRef();
  const confirmRef = useRef();

  console.log(confirm);
  const onClose = () => {
    setIsOpen(false);
    setConfirm(false);
  };
  const showAlert = () => setIsOpen(true);
  const confirmDeletion = () => {
    setConfirm(true);
    // setIsOpen(false);
  };
  const getTodos = () => {
    const collectionRef = collection(db, 'todos');

    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });

    return unsubscribe;
  };

  useEffect(() => {
    getTodos();
  }, []);

  // FOR SHOW
  const handleShowAllTodo = () => {
    getTodos();
  };

  const handleShowActiveTodo = (todo) => {
    const activeTodos = todo.filter((todo) => todo.completed === false);
    setTodos(activeTodos);
  };

  // FOR COMPLETED
  const handleCompleted = (todo) => {
    const newTodo = todos.map((data) => {
      if (data.id === todo.id) {
        const updateTodos = { ...data, completed: !data.completed };
        return updateTodos;
      }
      return data;
    });
    setTodos(newTodo);
  };

  const handleShowCompletedTodo = (todo) => {
    const completedTodos = todo.filter((todo) => todo.completed === true);
    setTodos(completedTodos);
  };

  // FOR REMOVE
  const handleRemove = async (id) => {
    showAlert();
    if (confirm) {
      const docRef = doc(db, 'todos', id);
      await deleteDoc(docRef);
      setConfirm(false);
      setIsOpen(false);
      console.log('confirm : true');
    } else {
      console.log('confirm : false');
    }
    // const comfirmDeletion = window.confirm('delete todo');
    // if (comfirmDeletion) {
    //   const docRef = doc(db, 'todos', id);
    //   await deleteDoc(docRef);
    // }
    // const item = todos.filter((todo) => todo.id !== id);
    // setTodos(item);
  };

  const handleRemoveClearCompleted = (todo) => {
    const completed = todo.filter(
      (completedTodo) => completedTodo.completed === true
    );
    const items = todos.filter((todo) => !completed.includes(todo));

    setTodos(items);
  };

  const reorderTodos = (todo, start, end) => {
    const result = Array.from(todo);
    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    setTodos(
      reorderTodos(todos, result.source.index, result.destination.index)
    );
  };

  return (
    <>
      <AlertDialogConfirm
        onClose={onClose}
        cancelRef={cancelRef}
        showAlert={showAlert}
        isOpen={isOpen}
        confirmDeletion={confirmDeletion}
        confirmRef={confirmRef}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <TodoItems
          todos={todos}
          handleCompleted={handleCompleted}
          handleRemove={handleRemove}
          handleShowAllTodo={handleShowAllTodo}
          handleShowActiveTodo={handleShowActiveTodo}
          handleShowCompletedTodo={handleShowCompletedTodo}
          handleRemoveClearCompleted={handleRemoveClearCompleted}
        />
      </DragDropContext>
    </>
  );
};

export default TodoList;
