import React from 'react';
import './App.css';
import { Autocomplete, Button, TextField, ThemeProvider, Typography } from '@mui/material';
import ListBadDrivers from './ListBadDrivers';
import darkTheme from './Theme';
import badDriverReasons from './BadDriverReasons';
import licensePlates from './LicensePlates';
import axios from 'axios';

interface Data {
  Message: string;
}

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
  const [data, setData] = React.useState<Data>({ Message: "" });
  const fetchData = React.useCallback(async () => {
    axios
      .get('http://localhost:4000/users/')
      .then((res) => setData(res.data));
  }, []);

  const sendData = React.useCallback(async () => {
    axios
      .post('http://localhost:4000/users/', { text: "Data from React" })
  }, []);

  React.useEffect(() => {
    fetchData();
    sendData();
  }, [fetchData, sendData]);

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
          <Button variant="contained">Vis flere</Button>
          <p />
        </ThemeProvider>
        {data.Message}
      </header>
    </div>
  );
}

export default App;
