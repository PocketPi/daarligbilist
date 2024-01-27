import React from 'react'
import './App.css'
import { Box, Button, Container, TextField, ThemeProvider, Typography } from '@mui/material'
import ListBadDrivers from './ListBadDrivers'
import darkTheme from './Theme'
import { useFormik } from 'formik'
import { type BadDriverReportInterface } from '../shared/types'
import * as yup from 'yup'
import { reportBadDriver } from './queries'

const websideTitle = 'DÅRLIG BILIST'

const initialValues: BadDriverReportInterface = {
  licensplate: '',
  reason: ''
}

const validationSchema = yup.object({
  licensplate: yup
    .string()
    .required('Nummerplade er påkrævet')
    .max(7, 'Maks 7 tegn')
    .matches(/^[a-zA-Z0-9]+$/, 'Kun bogstaver og tal'),
  reason: yup.string().required('Grund er påkrævet').max(255, 'Maks 255 tegn')
})

const ReportBadDriverForm = (): any => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const reason: BadDriverReportInterface = {
        licensplate: values.licensplate,
        reason: values.reason
      }
      console.log(JSON.stringify(reason, null, 2))
      void reportBadDriver(reason)
      resetForm({ values: initialValues })
      alert('Tak for din indberetning')
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        autoFocus
        fullWidth
        id="licensplate"
        name="licensplate"
        label="Nummerplade"
        value={formik.values.licensplate}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={(formik.touched.licensplate ?? false) && Boolean(formik.errors.licensplate)}
        helperText={(formik.touched.licensplate ?? false) && formik.errors.licensplate}
      />
      <TextField
        fullWidth
        id="reason"
        name="reason"
        label="Grund"
        value={formik.values.reason}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={(formik.touched.reason ?? false) && Boolean(formik.errors.reason)}
        helperText={(formik.touched.reason ?? false) && formik.errors.reason}
      />
      <Button fullWidth type="submit" variant="contained">
        Send
      </Button>
    </form>
  )
}

function App (): any {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container className="App" sx={{ flexDirection: 'column', display: 'flex' }}>
        <p />
        <Typography variant="h2">{websideTitle}</Typography>
        <p />
        <Box sx={{ maxWidth: 480, alignSelf: 'center' }}>
          <ReportBadDriverForm />
          <p />
          <ListBadDrivers />
          {/* <Button variant="contained">Vis flere</Button> */}
        </Box>
        <p />
      </Container>
    </ThemeProvider>
  )
}

export default App
