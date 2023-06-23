import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  daily_water_goal: yup.number().integer().required(),
  reminder_frequency: yup.number().integer().required(),
  reminder_start_time: yup.date().required(),
  reminder_end_time: yup.date().required(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
