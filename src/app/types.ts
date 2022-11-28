export interface Warrior {
  id: number;
  name: string;
  hp: number;
  skills: Skill[];
}

export interface Skill {
  id: number;
  point: number;
  skill_type: number;
  skill_type_option: number;
  warrior_id: number;
}
