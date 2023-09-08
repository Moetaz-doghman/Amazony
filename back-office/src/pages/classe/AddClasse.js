import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomButton, StyledForm, ErrorText } from '../../themes/style';
import Autocomplete from '@mui/material/Autocomplete';

const AddClasse = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [teacherList, setTeacherList] = useState([]); // State to hold the list of teachers for autocomplete

  useEffect(() => {
    // Fetch the list of teachers for autocomplete
    axios
      .get('http://localhost:8080/admin/findTeachers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setTeacherList(response.data);
      })
      .catch((error) => {
        setError('An error occurred while fetching the list of teachers.');
        console.error(error);
      });
  }, [token]);

  const initialValues = {
    name: '',
    teachers: [] // Initial value for FieldArray
  };

  const handleSubmit = (values) => {
    // Convert the selected options to an array of teacher objects
    const teachersArray = values.teachers.map((teacherLogin) => teacherList.find((teacher) => teacher.login === teacherLogin));

    // Extract the teacher logins from the teachersArray
    const teacherLogins = teachersArray.map((teacher) => teacher.login);

    const dataToSend = {
      name: values.name,
      teachers: teacherLogins // Send an array of teacher logins as strings
    };

    axios
      .post('http://localhost:8080/admin/classe', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        navigate('/classe-list');
      })
      .catch((error) => {
        setError('An error occurred while adding the classe. Please try again.');
        toast.error(error);
        console.error(error);
      });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = '☹︎ Name is required';
    }

    return errors;
  };

  const handleGoClassesList = () => {
    navigate(`/classe-list`);
  };

  return (
    <>
      <ToastContainer />
      {error && <div>Error: {error}</div>}
      <CustomButton onClick={handleGoClassesList}>Back</CustomButton>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        {({ values }) => (
          <StyledForm>
            <Field name="name">{({ field }) => <TextField required label="Class Name" {...field} fullWidth />}</Field>
            <ErrorMessage name="name" component={ErrorText} />

            <FieldArray name="teachers">
              {({ push, remove, form }) => (
                <div>
                  {values.teachers.map((_, index) => (
                    <div key={index}>
                      <Autocomplete
                        value={values.teachers[index]}
                        onChange={(event, newValue) => {
                          const newTeachers = [...values.teachers];
                          newTeachers[index] = newValue;
                          form.setFieldValue('teachers', newTeachers); // Access setFieldValue through the form
                        }}
                        options={teacherList.map((teacher) => teacher.login)}
                        renderInput={(params) => <TextField {...params} label="Teacher login" fullWidth />}
                      />
                      <ErrorMessage name={`teachers.${index}`} component={ErrorText} />

                      <Button type="button" onClick={() => remove(index)}>
                        Remove Teacher
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => push('')}>
                    Add Teacher
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default AddClasse;
