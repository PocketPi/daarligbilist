import React from "react";
import "./App.css";
import { Autocomplete, Button, TextField, ThemeProvider, Typography } from "@mui/material";
import ListBadDrivers from "./ListBadDrivers";
import darkTheme from "./Theme";
import badDriverReasons from "./BadDriverReasons";
import licensePlates from "./LicensePlates";
import { Form, useFormik } from "formik";
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

const ReportBadDriverForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => console.log(JSON.stringify(values, null, 4)),
    validationSchema: yup.object({
      licensplate: yup.string().required(),
      reason: yup.string().required(),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        id="licensplate"
        options={licensePlates}
        freeSolo
        style={{ width: 300 }}
        onChange={(e, value) => formik.setFieldValue("licensplate", value)}
        renderInput={(params) => (
          <TextField
            autoFocus
            label="Nummerplade"
            {...formik.getFieldProps("licensplate")}
            {...params}
          />
        )}
      />
      <Autocomplete
        id="reason"
        options={badDriverReasons}
        freeSolo
        style={{ width: 300 }}
        onChange={(e, value) => formik.setFieldValue("reason", value)}
        renderInput={(params) => (
          <TextField
            label="Grund"
            {...formik.getFieldProps("reason")}
            {...params} />
        )}
      />
      <Button fullWidth type="submit" variant="contained">
        Send
      </Button>
    </form>
  );
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <main className="App">
        <Typography variant="h2">{websideTitle}</Typography>
        <p />
        <ReportBadDriverForm />
        <p />
        <ListBadDrivers />
        <Button variant="contained">Vis flere</Button>
        <p />
      </main>
    </ThemeProvider>
  );
}

export default App;
