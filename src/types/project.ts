export type ProjectDonate = {
  project_id: number;
  project_name: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  start_date: Date;
  end_date: Date;
  status: string;
  project_manager_id: number;
  project_manager_name: string;
  created_at: Date;
  updated_at: Date;
};
