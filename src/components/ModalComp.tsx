import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  FormControl,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import { useState, useRef } from "react";
import justNumber from "../functions/justNumber";
import justText from "../functions/justText";
import { useDispatch } from "react-redux";
import { addWarrior } from "../features/settings/settingsSlice";

const ModalComp = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();
  const [warrior, setWarrior] = useState<{ name: string; hp: number }>({
    name: "",
    hp: 0,
  });

  const canSave = [
    warrior.name.trim(),
    warrior.hp >= 80 && warrior.hp <= 100,
  ].every(Boolean);

  const handleSubmit = () => {
    dispatch(addWarrior(warrior));
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Savaşçı Oluştur</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Savaşçı Adı</FormLabel>
            <Input
              ref={initialRef}
              onChange={(e) =>
                setWarrior((warrior) => ({
                  ...warrior,
                  ...{ name: e.target.value },
                }))
              }
              onKeyPress={(event) => justText(event)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Can Puanı</FormLabel>
            <NumberInput>
              <NumberInputField
                onChange={(e) =>
                  setWarrior((warrior) => ({
                    ...warrior,
                    ...{ hp: Number(e.target.value) },
                  }))
                }
                onKeyPress={(event) => justNumber(event)}
                placeholder="Min. 80 - Max. 100"
              />
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="purple"
            mr={3}
            disabled={!canSave}
            onClick={() => handleSubmit()}
          >
            Kaydet
          </Button>
          <Button onClick={onClose}>İptal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
