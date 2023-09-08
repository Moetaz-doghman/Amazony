import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { Button, TextField } from '@mui/material';
import { StyledForm, ErrorText, CustomButton } from '../../themes/style';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from '@mui/material/Autocomplete';

const UpdateClasseForm = () => {
  const token = localStorage.getItem('token');
  const { classeId } = useParams();
  const navigate = useNavigate();
  const [classeDetails, setClasseDetails] = useState(null);
  const [teacherList, setTeacherList] = useState([]);
  const [error, setError] = useState('');

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = '☹︎ Name is required';
    }

    // Validate logins
    if (values.teachers.some((teacher) => !teacher.login)) {
      errors.teachers = '☹︎ All Teacher login are required';
    }

    return errors;
  };

  const initialValues = {
    name: '',
    teachers: []
  };

  const fetchClasseDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/classes/${classeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const fetchedClasseDetails = response.data;

      const initialValues = {
        name: fetchedClasseDetails.name,
        teachers: fetchedClasseDetails.teachers.map((teacher) => ({ login: teacher.user.login }))
      };

      setClasseDetails(initialValues);
      setError('');
    } catch (error) {
      console.error('Error fetching classe details: ', error);
      setError('Failed to fetch classe details. Please try again later.');
    }
  }, [classeId, token]);

  const fetchTeacherList = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/findTeachers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTeacherList(response.data);
    } catch (error) {
      setError('An error occurred while fetching the list of teachers.');
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchClasseDetails();
    fetchTeacherList();
  }, [fetchClasseDetails, fetchTeacherList]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const requestData = {
        name: values.name,
        teachers: values.teachers.map((teacher) => teacher.login)
      };

      await axios.put(`http://localhost:8080/admin/classes/${classeId}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Classe updated');
      navigate('/classe-list');
    } catch (error) {
      toast.error('Error updating classe');
      console.error('Error updating classe:', error);
    }

    setSubmitting(false);
  };

  const handleAddTeacher = (push) => {
    push({ login: '' });
  };

  const handleRemoveTeacher = (remove, index) => {
    remove(index);
  };

  if (!classeDetails || !teacherList) {
    return <p>Loading...</p>;
  }

  const handleGoClassesList = () => {
    if (classeDetails) {
      navigate(`/classe-list`);
    } else {
      navigate(`/classe-list`, { replace: true });
    }
  };

  return (
    <>
      <ToastContainer />
      {error && <div>Error: {error}</div>}
      <CustomButton onClick={handleGoClassesList}>Back</CustomButton>
      <Formik initialValues={classeDetails || initialValues} onSubmit={handleSubmit} validate={validate}>
        {({ values, handleSubmit, isSubmitting }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field name="name">{({ field }) => <TextField required label="Name" {...field} fullWidth />}</Field>
            <ErrorMessage name="name" component={ErrorText} />

            <FieldArray name="teachers">
              {({ push, remove, form }) => (
                <div>
                  {values.teachers.map((_, index) => (
                    <div key={index}>
                      <Autocomplete
                        value={values.teachers[index].login} // Set the value to the corresponding login
                        onChange={(event, newValue) => {
                          const newTeachers = [...values.teachers];
                          newTeachers[index].login = newValue; // Update the login value in the array
                          form.setFieldValue('teachers', newTeachers); // Access setFieldValue through the form
                        }}
                        options={teacherList.map((teacher) => teacher.login)}
                        getOptionLabel={(option) => option} // Use the login value as the label
                        renderInput={(params) => <TextField {...params} label="Teacher login" fullWidth />}
                      />
                      <ErrorMessage name={`teachers.${index}.login`} component={ErrorText} />

                      <Button type="button" onClick={() => handleRemoveTeacher(remove, index)}>
                        Remove Teacher
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => handleAddTeacher(push)}>
                    Add Teacher
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Save
            </Button>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default UpdateClasseForm;
