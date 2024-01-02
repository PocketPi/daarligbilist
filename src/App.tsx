import React from 'react';
import Typography from '@mui/material/Typography';
import './App.css';
import { Autocomplete, Button, TextField, ThemeProvider } from '@mui/material';
import ListBadDrivers from './ListBadDrivers';
import darkTheme from './Theme';

const websideTitle = 'DÅRLIG BILIST';

const licensePlates = [
  { label: 'CS87107' },
]

const badDriverReasons = [
  { label: 'Kører for stærkt' },
  { label: 'Kører for langsomt' },
  { label: 'Kører i venstre spor' },
  { label: 'Kører i højre spor' },
  { label: 'Kører i midterste spor' },
  { label: 'Kører i cykelstien' },
  { label: 'Kører i fodgængerfeltet' },
  { label: 'Kører i busbanen' },
]

function LicensePlateInput() {
  return (
    <Autocomplete
      disablePortal
      id="license-plate-input"
      options={licensePlates}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField autoFocus {...params} label="Nummerplade" />}
    />
  );
}

function BadDriverReason() {
  return (
    <Autocomplete
      disablePortal
      id="bad-driver-reason-input"
      options={badDriverReasons}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Grund" />}
    />
  );
}

function SendButton() {
  return (
    <Button sx={{ width: 300 }}
      variant="contained">Send</Button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={darkTheme}>
          <Typography variant="h2">
            {websideTitle}
          </Typography>
          <LicensePlateInput />
          <BadDriverReason />
          <SendButton />
          <ListBadDrivers />
        </ThemeProvider>
      </header>
    </div>

  );
}

export default App;
