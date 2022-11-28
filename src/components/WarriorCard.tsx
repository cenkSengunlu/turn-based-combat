import { useState } from "react";
import { Select } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setMove, selectWinner } from "../features/battle/battleSlice";
import { Progress } from "@chakra-ui/react";
import { Skill, Warrior } from "../app/types";

const WarriorCard = ({
  warrior,
  isOpponent,
  isYourTurn,
}: {
  warrior: Warrior;
  isOpponent: boolean;
  isYourTurn: boolean;
}) => {
  const [selectedMove, setSelectedMove] = useState<number>();
  const winner = useSelector(selectWinner);
  const dispatch = useDispatch();
  const handleMove = () => {
    const skill_type = isYourTurn ? 1 : 2;
    const skill_type_option = selectedMove;

    const point =
      warrior.skills.find(
        (skill2: Skill) =>
          skill2.skill_type === skill_type &&
          skill2.skill_type_option === skill_type_option
      )?.point || 0;
    if (skill_type_option) {
      dispatch(setMove(skill_type, skill_type_option, point));
    }
  };

  return (
    <div className="border-2 border-zinc-300 rounded-lg w-40 p-3 flex flex-col items-center shadow-lg">
      <div className="text-center font-semibold text-lg">{warrior.name}</div>
      <div className="mt-3 bg-green-500 border-2 border-green-600 rounded-lg w-full text-center text-white font-semibold text-lg">
        {warrior.hp}
      </div>
      <div className="my-3 font-semibold">
        {isYourTurn ? <div>Atak</div> : <div>Defans</div>}
      </div>

      {!isOpponent && (
        <Select
          placeholder="Seçiniz..."
          onChange={(e) => setSelectedMove(Number(e.target.value))}
        >
          <option value="1">Kısa Mesafe</option>
          <option value="2">Uzak Mesafe</option>
        </Select>
      )}

      {!isOpponent && (
        <button
          className="py-1 px-3 mt-2 bg-blue-500 border-2 border-blue-600  rounded-lg text-white w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleMove()}
          disabled={!selectedMove || winner !== ""}
        >
          Hamle Yap
        </button>
      )}
    </div>
  );
};

export default WarriorCard;
