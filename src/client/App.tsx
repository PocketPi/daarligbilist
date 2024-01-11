import React from "react";
import "./App.css";
import { Autocomplete, Button, TextField, ThemeProvider, Typography } from "@mui/material";
import ListBadDrivers from "./ListBadDrivers";
import darkTheme from "./Theme";
import badDriverReasons from "./BadDriverReasons";
import licensePlates from "./LicensePlates";
import { Form, Formik, FormikHelpers } from "formik";
import { BadDriverReportInterface } from "../shared/types";

interface Data {
  Message: string;
}

const websideTitle = "DÅRLIG BILIST";

const initialValues: BadDriverReportInterface = {
  licensplate: "",
  reason: "",
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <main className="App">
        <Typography variant="h2">{websideTitle}</Typography>
        <p />
        <Formik
          initialValues={initialValues}
          onSubmit={(values: BadDriverReportInterface, { setSubmitting }: FormikHelpers<BadDriverReportInterface>) => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          <Form>
            <Autocomplete
              id="licensplate"
              options={licensePlates}
              freeSolo
              style={{ width: 300 }}
              renderInput={(params) => <TextField autoFocus label="Nummerplade" {...params} />}
            />
            <Autocomplete
              id="reason"
              options={badDriverReasons}
              freeSolo
              style={{ width: 300 }}
              renderInput={(params) => <TextField label="Grund" {...params} />}
            />
            <Button type="submit" variant="contained">
              Send
            </Button>
          </Form>
        </Formik>

        <p />
        <ListBadDrivers />
        <Button variant="contained">Vis flere</Button>
        <p />
      </main>
    </ThemeProvider>
  );
}

export default App;
