import React from "react";
import "./App.css";
import { Autocomplete, Button, TextField, ThemeProvider, Typography } from "@mui/material";
import ListBadDrivers from "./ListBadDrivers";
import darkTheme from "./Theme";
import badDriverReasons from "./BadDriverReasons";
import licensePlates from "./LicensePlates";
import { Form, useFormik, Formik } from "formik";
import { BadDriverReportInterface } from "../shared/types";
import * as yup from "yup";

const validationSchema = yup.object({
  licensplate: yup.string("Nummerplade").required("Nummerplade er påkrævet"),
  reason: yup.string("Grund").required("Grund er påkrævet"),
});

const websideTitle = "DÅRLIG BILIST";

const initialValues: BadDriverReportInterface = {
  licensplate: "",
  reason: "",
};

function App() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <main className="App">
        <Typography variant="h2">{websideTitle}</Typography>
        <p />
        <Formik
          initialValues={initialValues}
          onSubmit={({ licensplate }) => {
            alert("Submit " + licensplate);
          }}
        >
          {({ handleChange, values, setFieldValue }) => (
            <Form>
              <Autocomplete
                id="licensplate"
                options={licensePlates}
                freeSolo
                style={{ width: 300 }}
                onChange={(event, value) => {
                  setFieldValue("licensplate", value);
                }}
                renderInput={(params) => (
                  <TextField
                    autoFocus
                    label="Nummerplade"
                    value={values.licensplate}
                    onChange={handleChange}
                    {...params}
                  />
                )}
              />
              <Autocomplete
                id="reason"
                options={badDriverReasons}
                freeSolo
                style={{ width: 300 }}
                onChange={(event, value) => {
                  setFieldValue("reason", value);
                }}
                renderInput={(params) => (
                  <TextField label="Grund" value={values.reason} onChange={handleChange} {...params} />
                )}
              />
              <Button fullWidth type="submit" variant="contained">
                Send
              </Button>
            </Form>
          )}
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
