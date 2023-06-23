import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getEmployeeById, updateEmployeeById } from 'apiSdk/employees';
import { Error } from 'components/error';
import { employeeValidationSchema } from 'validationSchema/employees';
import { EmployeeInterface } from 'interfaces/employee';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';
import { getUsers } from 'apiSdk/users';
import { getCompanies } from 'apiSdk/companies';

function EmployeeEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EmployeeInterface>(
    () => (id ? `/employees/${id}` : null),
    () => getEmployeeById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: EmployeeInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateEmployeeById(id, values);
      mutate(updated);
      resetForm();
      router.push('/employees');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<EmployeeInterface>({
    initialValues: data,
    validationSchema: employeeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Employee
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="daily_water_goal" mb="4" isInvalid={!!formik.errors?.daily_water_goal}>
              <FormLabel>Daily Water Goal</FormLabel>
              <NumberInput
                name="daily_water_goal"
                value={formik.values?.daily_water_goal}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('daily_water_goal', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.daily_water_goal && <FormErrorMessage>{formik.errors?.daily_water_goal}</FormErrorMessage>}
            </FormControl>
            <FormControl id="reminder_frequency" mb="4" isInvalid={!!formik.errors?.reminder_frequency}>
              <FormLabel>Reminder Frequency</FormLabel>
              <NumberInput
                name="reminder_frequency"
                value={formik.values?.reminder_frequency}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('reminder_frequency', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.reminder_frequency && (
                <FormErrorMessage>{formik.errors?.reminder_frequency}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="reminder_start_time" mb="4">
              <FormLabel>Reminder Start Time</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.reminder_start_time ? new Date(formik.values?.reminder_start_time) : null}
                  onChange={(value: Date) => formik.setFieldValue('reminder_start_time', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <FormControl id="reminder_end_time" mb="4">
              <FormLabel>Reminder End Time</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.reminder_end_time ? new Date(formik.values?.reminder_end_time) : null}
                  onChange={(value: Date) => formik.setFieldValue('reminder_end_time', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<CompanyInterface>
              formik={formik}
              name={'company_id'}
              label={'Select Company'}
              placeholder={'Select Company'}
              fetcher={getCompanies}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'employee',
  operation: AccessOperationEnum.UPDATE,
})(EmployeeEditPage);
