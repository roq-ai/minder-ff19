import axios from 'axios';
import queryString from 'query-string';
import { WaterIntakeInterface, WaterIntakeGetQueryInterface } from 'interfaces/water-intake';
import { GetQueryInterface } from '../../interfaces';

export const getWaterIntakes = async (query?: WaterIntakeGetQueryInterface) => {
  const response = await axios.get(`/api/water-intakes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWaterIntake = async (waterIntake: WaterIntakeInterface) => {
  const response = await axios.post('/api/water-intakes', waterIntake);
  return response.data;
};

export const updateWaterIntakeById = async (id: string, waterIntake: WaterIntakeInterface) => {
  const response = await axios.put(`/api/water-intakes/${id}`, waterIntake);
  return response.data;
};

export const getWaterIntakeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/water-intakes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWaterIntakeById = async (id: string) => {
  const response = await axios.delete(`/api/water-intakes/${id}`);
  return response.data;
};
