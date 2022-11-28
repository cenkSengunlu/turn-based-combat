import { useDisclosure } from "@chakra-ui/react";
import AccordionComp from "../../components/AccordionComp";
import ModalComp from "../../components/ModalComp";
import { selectWarriors, selectGetWarriorStatus } from "./settingsSlice";
import { useSelector } from "react-redux";

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getWarriorStatus = useSelector(selectGetWarriorStatus);
  return (
    <div className="h-full w-full flex items-center flex-col pt-10">
      <div>
        <button
          onClick={onOpen}
          className="bg-violet-600 border-2 border-violet-800 text-white py-1 px-2 rounded-lg font-semibold transition ease-in-out delay-150 hover:scale-110 duration-300"
        >
          Savaşçı Ekle
        </button>
        <ModalComp isOpen={isOpen} onClose={onClose} />
      </div>
      <div className="mt-5 w-5/6 overflow-y-auto mb-8">
        {getWarriorStatus === "loading" && <div>Loading...</div>}
        {getWarriorStatus === "succeeded" && <AccordionComp />}
      </div>
    </div>
  );
};

export default Settings;
