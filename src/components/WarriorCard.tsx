import React from "react";

const WarriorCard = (warrior: any, doppel: boolean) => {
  return (
    <div>
      <div>{warrior.name}</div>
      <div>{warrior.hp}</div>
    </div>
  );
};

export default WarriorCard;
