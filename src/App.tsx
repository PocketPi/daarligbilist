import React from 'react';
import Typography from '@mui/material/Typography';
import './App.css';
import { Autocomplete, Button, TextField, ThemeProvider } from '@mui/material';
import ListBadDrivers from './ListBadDrivers';
import darkTheme from './Theme';
import badDriverReasons from './BadDriverReasons';
import licensePlates from './LicensePlates';

const websideTitle = 'DÅRLIG BILIST';

function LicensePlateInput() {
  return (
    <Autocomplete
      options={licensePlates}
      freeSolo
      renderInput={(params) => <TextField autoFocus {...params} label="Nummerplade" />}
    />
  );
}

function BadDriverReason() {
  return (
    <Autocomplete
      options={badDriverReasons}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Grund" />}
    />
  );
}

function SendButton() {
  return (
    <Button variant="contained">Send</Button>
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
          <p />
          <LicensePlateInput />
          <BadDriverReason />
          <SendButton />
          <p />
          <ListBadDrivers />
        </ThemeProvider>
      </header>
    </div>

  );
}

export default App;
