import { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

function AlertDialogConfirm({
  onClose,
  isOpen,
  cancelRef,
  showAlert,
  confirmDeletion,
  confirmRef,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  // const onClose = () => setIsOpen(false);
  // const cancelRef = useRef();

  // const showAlert = () => setIsOpen(true);
  return (
    <>
      {/* <Button colorScheme="red" onClick={showAlert}>
        Delete Customer
      </Button> */}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                ref={confirmRef}
                colorScheme="red"
                onClick={confirmDeletion}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertDialogConfirm;
