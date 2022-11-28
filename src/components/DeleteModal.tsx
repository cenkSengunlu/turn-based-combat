import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteWarrior, deleteSkill } from "../features/settings/settingsSlice";

const DeleteModal = ({
  isOpen,
  onClose,
  id,
  delete_option,
}: {
  isOpen: boolean;
  onClose: any;
  id: number;
  delete_option: string;
}) => {
  const dispatch = useDispatch();
  const cancelRef = useRef(null);
  const handleDelete = () => {
    delete_option === "delete_warrior"
      ? dispatch(deleteWarrior(id))
      : dispatch(deleteSkill(id));
    onClose();
  };
  console.log(id);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {delete_option === "delete_warrior" ? "Savaşçı Sil" : "Skill Sil"}
          </AlertDialogHeader>

          <AlertDialogBody>
            Emin misin? Silme işlemini geri alamazsın.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              İptal
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Sil
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteModal;
