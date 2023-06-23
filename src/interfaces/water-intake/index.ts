import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface WaterIntakeInterface {
  id?: string;
  employee_id: string;
  amount: number;
  date: any;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  _count?: {};
}

export interface WaterIntakeGetQueryInterface extends GetQueryInterface {
  id?: string;
  employee_id?: string;
}
