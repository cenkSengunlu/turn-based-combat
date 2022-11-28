import { Select } from "@chakra-ui/react";
import { selectWarriors } from "../features/settings/settingsSlice";
import {
  startBattle,
  selectIsBattle,
  selectWarrior,
} from "../features/battle/battleSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Skill, Warrior } from "../app/types";

const WarriorSelection = () => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState<number>();
  const warriors = useSelector(selectWarriors);
  const isBattle = useSelector(selectIsBattle);
  const filteredWarriors = warriors.filter(
    (warrior: Warrior) =>
      warrior.skills !== null &&
      warrior.skills.length === 4 &&
      warrior.skills.every((skill: Skill) => skill.id)
  );
  const handleStart = () => {
    const opponent =
      filteredWarriors[Math.floor(Math.random() * filteredWarriors.length)];
    const selected_warrior = filteredWarriors.find(
      (warrior: Warrior) => select === warrior.id
    );
    if (selected_warrior) {
      dispatch(selectWarrior(selected_warrior));
    }
    dispatch(startBattle(opponent.id, selected_warrior));
  };

  return (
    <>
      <div className="h-fit flex items-center grid grid-cols-3 gap-3 w-4/6">
        <div className="w-full font-semibold text-lg text-center">
          Savaşçi Seç
        </div>
        <div className="w-full">
          <Select
            placeholder="Seçiniz..."
            defaultValue={select}
            onChange={(e) => setSelect(Number(e.target.value))}
            disabled={isBattle}
          >
            {filteredWarriors.map((warrior: Warrior, index: number) => {
              return (
                <option key={index} value={warrior.id}>
                  {warrior.name}
                </option>
              );
            })}
          </Select>
        </div>

        <button
          className="py-2 px-3 bg-green-500 border border-2 border-green-700 rounded-lg text-white w-full disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!select || isBattle}
          onClick={() => handleStart()}
        >
          Başla
        </button>
      </div>
    </>
  );
};

export default WarriorSelection;
