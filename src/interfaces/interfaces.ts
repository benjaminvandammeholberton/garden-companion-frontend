export interface VegetableInterface {
  vegetable_manager_id?: string
  name: string;
  variety: string;
  quantity: number;
  quantity_unit?: string;
  sowing_date?: string;
  planting_date?: string | null;
  harvest_date?: string | null | null;
  harvest_quantity?: number | null;
  harvest_unit?: string | null;
  remove_date?: string | null;
  area: string | null;
}

export interface AreaInterface {
  area_id?: string;
  name: string;
  surface: number;
  created_at?: string;
  updated_at?: string;
  environnement?: string;
  vegetables: VegetableInterface[] | [];
}

export interface SeedlingInterface {
  seedling_id: string;
  name: string;
  variety: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface ActionInterface {
  action_id: string;
  name: string;
  date: string;
  area: string;
  vegetable: string;
  created_at: string;
  updated_at: string;
}
