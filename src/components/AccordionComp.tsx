import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { selectWarriors, setSkill } from "../features/settings/settingsSlice";
import DeleteModal from "./DeleteModal";
import SkillRow from "./SkillRow";
import { Skill, Warrior } from "../app/types";
const AccordionComp = () => {
  const dispatch = useDispatch();
  const warriors = useSelector(selectWarriors);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeAccordion, setActiveAccordion] = useState<number>(-1);
  const [selectedWarrior, setSelectedWarrior] = useState<number>();

  const handleActive = (index: number) => {
    if (activeAccordion === -1) {
      setActiveAccordion(index);
    } else {
      setActiveAccordion(-1);
    }
  };

  const handleSkill = (warrior: Warrior) => {
    if (warrior) {
      const warriorSkills = [
        ...warrior?.skills,
        {
          warrior_id: warrior.id,
          skill_type: 0,
          skill_type_option: 0,
          point: 0,
        },
      ];
      const newWarrior = {
        ...warrior,
        skills: warriorSkills,
      } as Warrior;

      dispatch(setSkill(newWarrior));
    }
  };
  const onDialogClose = () => {
    onClose();
    setSelectedWarrior(undefined);
  };
  return (
    <>
      {isOpen && selectedWarrior && (
        <DeleteModal
          isOpen={isOpen}
          onClose={onDialogClose}
          id={selectedWarrior}
          delete_option="delete_warrior"
        />
      )}
      <Accordion allowToggle onChange={(index) => handleActive(Number(index))}>
        {warriors.map((warrior: Warrior, index: number) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <div className="flex items-center">
                    <div className="w-32">{warrior.name}</div>
                    <div className="ml-20 bg-green-400 border-2 border-green-600 w-32 flex justify-center items-center rounded-lg">
                      {warrior.hp}
                    </div>
                  </div>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} className="mt-3">
              <div className="grid grid-cols-4 gap-4">
                <div className="w-full flex justify-center items-center">
                  T??r
                </div>
                <div className="w-full flex justify-center items-center">
                  Alt T??r
                </div>
                <div className="w-full flex justify-center items-center">
                  Hasar Puan??
                </div>
                <div className="w-full grid grid-cols-2 gap-1">
                  <button
                    disabled={warrior.skills && warrior.skills.length === 4}
                    onClick={() => handleSkill(warrior)}
                    className="cursor-pointer bg-blue-600 border-2 border-blue-700 rounded-lg w-full h-10 flex justify-center items-center text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Skill Ekle
                  </button>

                  <button
                    onClick={() => {
                      onOpen();
                      setSelectedWarrior(warrior.id);
                    }}
                    className="cursor-pointer bg-red-500 border-2 border-red-600 rounded-lg w-full h-10 flex justify-center items-center text-white text-sm"
                  >
                    Sava??????y?? Sil
                  </button>
                </div>

                {warrior.skills &&
                  warrior.skills.map((skill: Skill, index: number) => (
                    <SkillRow skill={skill} index={index} key={index} />
                  ))}
              </div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default AccordionComp;
