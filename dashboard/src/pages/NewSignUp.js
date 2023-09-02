import React, { Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CssBaseline,
  AppBar,
  Box,
  Container,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography,
} from '@mui/material';
import useCreateStore from '../sections/auth/signup/hooks/useCreateStore';
import SelectStoreNameForm from '../sections/auth/signup/SelectStoreNameForm';
import AccountDetails from '../sections/auth/signup/AccountDetails';
import Review from '../sections/auth/signup/Review';
import ErrorSnackbar from '../components/errorSnackbar';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://myshopx.net/">
        ShopX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Warning() {
  return (
    <Typography variant="subtitle1" align="center">
      Note: This is a demo, all transactions will not go through and all accounts will be recreated after launch date,
    </Typography>
  );
}

const SignUp = () => {
  const navigate = useNavigate();
  const navigateTo = '/signin';
  const {
    accountType,
    brandColor,
    email,
    errorMessage,
    isStoreNameValid,
    product,
    password,
    setErrorMessage,
    storeName,
    storeUrl,
    verifyPassword,
    handleAccountTypeChange,
    handleOnChange,
    handleCheckStoreName,
    handleSubmit,
  } = useCreateStore();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Name your Store', 'Account Details', 'Review'];

  //   @TODO move to helper function

  const isDisabled = () => {
    switch (activeStep) {
      case 0:
        if (!isStoreNameValid || !product || !brandColor) {
          return true;
        }
        return false;
      case 1:
        if (!email || errorMessage) {
          return true;
        }
        return false;
      case 2:
        return false;
      default:
        return true;
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <SelectStoreNameForm
            storeName={storeName}
            product={product}
            brandColor={brandColor}
            isStoreNameValid={isStoreNameValid}
            onChange={handleOnChange}
            checkStoreName={handleCheckStoreName}
          />
        );
      case 1:
        return (
          <AccountDetails
            accountType={accountType}
            email={email}
            password={password}
            verifyPassword={verifyPassword}
            onChange={handleOnChange}
            onAccountTypeChange={handleAccountTypeChange}
          />
        );
      case 2:
        return <Review storeUrl={storeUrl} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = async () => {
    if (activeStep === 0) {
      await handleCheckStoreName();
      if (isStoreNameValid) setActiveStep(activeStep + 1);
    }
    if (activeStep === 1) {
      const isValid = await handleSubmit();
      if (isValid) setActiveStep(activeStep + 1);
    }
    if (activeStep === 2) {
      setActiveStep(activeStep + 1);
      navigate(navigateTo);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            ShopX
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        {errorMessage && <ErrorSnackbar error={errorMessage} setError={setErrorMessage} />}
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create A New Store
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
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                You will be redirected to process your payment. We have emailed, and will send you an update when your
                order has processed.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep === 1 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  disabled={isDisabled()}
                  //   onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 2 ? 'Create Store' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
        <Warning />
        <Copyright />
      </Container>
    </>
  );
};

export default SignUp;
