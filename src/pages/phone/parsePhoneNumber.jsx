import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { parsePhoneNumber } from '@razorpay/i18nify-js/phoneNumber';

import Container from '@mui/material/Container';
import { Grid, useTheme, Typography, useMediaQuery } from '@mui/material';

import PhoneNumberForm from 'src/sections/phoneNumber/phoneNumber-form';

const CodeEditor = ({ value }) => {
  return (
    <Editor
      theme="vs-dark"
      defaultLanguage="json"
      value={value}
      options={{ minimap: { enabled: false } }}
    />
  );
};

// ----------------------------------------------------------------------

export default function IsValidPhoneNumberView() {
  const [inpValue, setInpValue] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const code = inpValue > 5 ? parsePhoneNumber(inpValue) : {};
  const formattedCode = JSON.stringify(code, null, 2);

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={isMobile ? 12 : 7}>
          <Typography color="#4767FD" variant="h2" sx={{ mb: 2 }}>
            ParsePhoneNumber
          </Typography>

          <Typography variant="body1" sx={{ mb: 6 }}>
            Unraveling the secrets of your number! Let's decode this digital puzzle into something more... worldly. 🌐✨
          </Typography>
        </Grid>
        {isMobile && (
          <Grid item xs={12}>
            <Grid sx={{ height: '200px' }} container alignItems="center" justifyContent="center">
              <Grid item sx={{ height: '200px', width: '100%', padding: '20px 0px' }}>
                <CodeEditor value={formattedCode} />
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={isMobile ? 12 : 7}   sx={!isMobile && { 'border-right': '1px solid rgba(0,0,0,0.2)', pr: 2 }}>
          <PhoneNumberForm
            inpValue={inpValue}
            onInpChange={(val) => setInpValue(val)}
            countryCode={countryCode}
            onCountryCodeChange={(val) => setCountryCode(val)}
            showDialCodeSelector={false}
            utilName="parsePhoneNumber"
          />
        </Grid>

        {!isMobile && (
          <Grid item xs={5}>
            <Grid sx={{ height: '60vh' }} container alignItems="center" justifyContent="center">
              <Grid item sx={{ height: '100%', width: '100%', padding: '0px 20px' }}>
                <CodeEditor value={formattedCode} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
