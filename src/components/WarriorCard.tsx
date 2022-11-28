import { useState } from "react";
import { Select } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setMove, selectWinner } from "../features/battle/battleSlice";
import { Progress } from "@chakra-ui/react";

const WarriorCard = ({
  warrior,
  isOpponent,
  isYourTurn,
}: {
  warrior: any;
  isOpponent: boolean;
  isYourTurn: boolean;
}) => {
  const [selectedMove, setSelectedMove] = useState<number>();
  const winner = useSelector(selectWinner);
  const dispatch = useDispatch();
  console.log(warrior);
  const handleMove = () => {
    const skill_type = isYourTurn ? 1 : 2;
    const skill_type_option = selectedMove;
    const point = warrior.skills.find(
      (skill: any) =>
        skill.skill_type === skill_type &&
        skill.skill_type_option === skill_type_option
    ).point;
    if (skill_type_option) {
      dispatch(setMove(skill_type, skill_type_option, point));
    }
  };

  return (
    <div className="border-2 border-zinc-300 rounded-lg w-36 h-48 p-3 flex flex-col items-center shadow-lg">
      <div className="text-center">{warrior.name}</div>
      <div>{warrior.hp}</div>
      {isYourTurn ? <div>Atak</div> : <div>Defans</div>}
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
