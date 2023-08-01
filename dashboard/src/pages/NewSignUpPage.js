import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Link,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import APIHandler from '../api/APIHandler';
import ErrorSnackbar from '../components/errorSnackbar';
import useAuth from '../hooks/useAuth';
import SelectStoreNameForm from '../sections/auth/signup/SelectStoreNameForm';
import AccountDetails from '../sections/auth/signup/AccountDetails';
import Review from '../sections/auth/signup/Review';

const theme = createTheme();

const steps = ['Name your store', 'Account details', 'Review settings'];

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ShopX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function getStepContent(step, { setDisableNextButton, setStoreName, setEmail, setPassword }) {
  switch (step) {
    case 0:
      return <SelectStoreNameForm setDisableNextButton={setDisableNextButton} setStoreName={setStoreName} />;
    case 1:
      return <AccountDetails setEmail={setEmail} setPassword={setPassword} />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function SignUp() {
  const apiHandler = new APIHandler();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || '/dashboard';
  const navigateTo = '/signin';
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [disableNextButton, setDisableNextButton] = useState(true);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formValidation = () => {
    if (email.includes('<') || email.includes('>') || !email.includes('@')) {
      setErrorMessage('Invalid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValidation()) {
      const { token, admin, store, error } = await apiHandler.signup({ email, password, storeName });

      if (token) {
        navigate(navigateTo);
      } else {
        setErrorMessage(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px black solid',
          minHeight: '100%',
        }}
      >
        <Container component="main" maxWidth="xs" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" align="center">
              Create A Store
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank choosing ShopX.
                </Typography>
                <Typography variant="subtitle1">
                  Your online website has been created. You can sign-in to start managing your store
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep, { setDisableNextButton, setStoreName })}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }} disabled={disableNextButton}>
                    {activeStep === steps.length - 1 ? 'Create my store' : 'Next'}
                  </Button>
                </Box>
              </>
            )}
          </Paper>

          {/* {errorMessage && <ErrorSnackbar error={errorMessage} setError={setErrorMessage} />}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="storeName"
                  label="Store Name"
                  name="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box> */}
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
