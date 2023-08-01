import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Step, StepLabel, Stepper, TextField,Typography } from '@mui/material';
import { useState } from 'react';

const steps = ['UserDetails 1', 'UserDetails 2', 'UserDetails 3'];

const southIndianStates = ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana'];

const districtOptions = {
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Namakkal'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar'],
};


const EventHandling =() =>
{
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: '',
      password: '',
      email: '',
      gender:'',
      programmingLanguage:[],
      state: '',
      district: '',
    });
  
   


    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setFormData({
        name: '',
        password: '',
        email: '',
        gender:'',
        programmingLanguage:[],
        state: '',
        district: '',
      });
    };
  
    const isStepOptional = (step) => {
      return false;
    };
  
    const isStepSkipped = (step) => {
      return false;
    };
  
  
    const [emailError, setEmailError] = useState(false);

    const handleChange = (event) => {
      const { name, value, checked } = event.target;
    
      if (name === 'state') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          district: districtOptions[value][0],
        }));
      } else
       if (name === 'programmingLanguage') {
        if (checked) {
          setFormData((prevData) => ({
            ...prevData,
            programmingLanguage: [...prevData.programmingLanguage, value],
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            programmingLanguage: prevData.programmingLanguage.filter(
              (lang) => lang !== value
            ),
          }));
        }
      }
      // else if (name === 'email') {
      //   // Email validation using regular expression
      //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //   setEmailError(!emailPattern.test(value));
  
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     [name]: value,
      //   }));
      // }
       else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
    
    useEffect(() => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailPattern.test(formData.email));
    }, [formData.email]);
    
    const getStepContent = (step) => {
      switch (step) {
        case 0:
          return (
            <Box>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="password"
                label="Password"
                type='password'
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
             
               <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={emailError}
        helperText={emailError ? 'Enter valid email.' : ''}
      />
    <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          
     
            </Box>
          );
        case 1:
          return (
            <Box >
              <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Programming Languages Known</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.programmingLanguage.includes('Reactjs')}
                    onChange={handleChange}
                    name="programmingLanguage"
                    value="Reactjs"
                  />
                }
                label="Reactjs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.programmingLanguage.includes('Csharp')}
                    onChange={handleChange}
                    name="programmingLanguage"
                    value="Csharp"
                  />
                }
                label="Csharp"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.programmingLanguage.includes('Java')}
                    onChange={handleChange}
                    name="programmingLanguage"
                    value="Java"
                  />
                }
                label="Java"
              />
            </FormGroup>
          </FormControl>
              <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                <InputLabel htmlFor="state">State</InputLabel>
                <Select
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleChange}
                  fullWidth
                >
                  {southIndianStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="district">District</InputLabel>
                <Select
                  name="district"
                  label="District"
                  value={formData.district}
                  onChange={handleChange}
                  fullWidth
                >
                  {formData.state &&
                    districtOptions[formData.state].map((district) => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          );
        case 2:
          return (
            <Box sx={{color:"rebeccapurple"}}>
              <Typography>Name: {formData.name}</Typography>
              <Typography>Password: {formData.password}</Typography>
              <Typography>Email: {formData.email}</Typography>
              <Typography>Gender: {formData.gender}</Typography>
              <Typography>Programming Languages Known: {formData.programmingLanguage}</Typography>
              <Typography>State: {formData.state}</Typography>
              <Typography>District: {formData.district}</Typography>
            </Box>
          );
        default:
          return <Typography>Click Reset to Start From First!</Typography>;
      }
    };
    
    return(
        <>
        <Typography variant='h4' sx={{textAlign:"center", color:"burlywood"}}>Event Handling </Typography>
    <Box sx={{ p: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant='contained' color='error'  onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 , pb:3 }}>
            <Button variant='contained' color="secondary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button variant='contained'  onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button variant='contained' onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}

      {getStepContent(activeStep)}
    </Box>
        </>
    );
};

export default EventHandling;