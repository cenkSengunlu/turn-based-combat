import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectWarriors } from "../features/settings/settingsSlice";

const AccordionComp = () => {
  const warriors = useSelector(selectWarriors);

  const [activeAccordion, setActiveAccordion] = useState<number>(-1);
  const [skills, setSkills] = useState<any>([]);
  console.log(warriors);

  const handleActive = (index: number) => {
    console.log(index);
    if (activeAccordion === -1) {
      setActiveAccordion(index);
    } else {
      setActiveAccordion(-1);
    }
  };

  const handleSkill = () => {
    setSkills([...skills, { type: 0, subType: 0, dp: 0 }]);
  };
  return (
    <Accordion allowToggle onChange={(index) => handleActive(Number(index))}>
      {warriors.map((warrior: any, index: number) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <div className="flex items-center">
                  <div className="w-32">{warrior.name}</div>
                  <div className="ml-20 bg-green-400 border-2 border-green-600 w-32 flex justify-center items-center rounded-lg">
                    {warrior.hp}
                  </div>
                  {/* {index === activeAccordion && (
                    <div
                      onClick={() =>
                        console.log(`${warrior.name} siliniyor...`)
                      }
                      className="ml-20 bg-red-400 border-2 border-red-600 w-32 flex justify-center items-center rounded-lg z-5"
                    >
                      Savaçıyı Sil
                    </div>
                  )} */}
                </div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="mt-3">
            <div className="grid grid-cols-4 gap-4">
              <div className="w-full flex justify-center items-center">Tür</div>
              <div className="w-full flex justify-center items-center">
                Alt Tür
              </div>
              <div className="w-full flex justify-center items-center">
                Hasar Puanı
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  onClick={() => handleSkill()}
                  className="cursor-pointer bg-blue-600 border-2 border-blue-700 rounded-lg w-10 h-10 text-2xl flex justify-center items-center text-white"
                >
                  +
                </button>
              </div>

              {/* {warrior.skills.map((skill: any, index: number) => (
                <>
                  {Object.keys(skill).map((column, colIndex) => (
                    <div key={colIndex}>
                      <Select placeholder="Seçiniz..." className="w-full">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </Select>
                    </div>
                  ))}
                  <div className="w-full grid grid-cols-2 gap-2">
                    <button className="w-full bg-green-500 border-2 border-green-600 rounded-lg">
                      Kaydet
                    </button>
                    <button className="w-full bg-red-500 border-2 border-red-600 text-white rounded-lg">
                      Sil
                    </button>
                  </div>
                </>
              ))} */}
            </div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComp;
