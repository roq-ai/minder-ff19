import { WaterIntakeInterface } from 'interfaces/water-intake';
import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface EmployeeInterface {
  id?: string;
  user_id: string;
  company_id: string;
  daily_water_goal: number;
  reminder_frequency: number;
  reminder_start_time: any;
  reminder_end_time: any;
  created_at?: any;
  updated_at?: any;
  water_intake?: WaterIntakeInterface[];
  user?: UserInterface;
  company?: CompanyInterface;
  _count?: {
    water_intake?: number;
  };
}

export interface EmployeeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  company_id?: string;
}
