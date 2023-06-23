import * as yup from 'yup';

export const waterIntakeValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  date: yup.date().required(),
  employee_id: yup.string().nullable().required(),
});
