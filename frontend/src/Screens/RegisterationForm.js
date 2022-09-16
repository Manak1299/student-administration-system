import React, { useState, useEffect } from "react";
import Input from '@material-ui/core/Input';
import { makeStyles, withStyles,useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Route, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MuiPhoneNumber from "material-ui-phone-number";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import { green, purple } from "@material-ui/core/colors";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { listClasses, listdivision } from "../actions/classactions";
import {listSubjects} from "../actions/subjectactions";
import { infoformdetails } from "../actions/infoformactions";
import { FormLabel, DialogContent } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import StudentinfoadminScreen from "./StudentinfoadminScreen";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import "../index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
    color: "purple",
  },
 /*  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }, */
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const styles = {
  marginLeft: "20px",
};

/* function getStyles(subjectinfo, theme) {
  return {
    fontWeight:
      subjectname.indexOf(subjectname) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
} */

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function RegisterationForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const classList = useSelector((state) => state.classList);
  console.log("Classlist :::: ", classList);
  const { loadingclass, classinfo, errorclass } = classList;

  const divisionList = useSelector((state) => state.divisionList);
  console.log("Divisionlist :::: ", divisionList);
  const { loadingdiv, divisioninfo, errordiv } = divisionList;

  const subjectList = useSelector((state) => state.subjectList);
  console.log("Subjectlist :::: ", subjectList);
  const { loading, subjectinfo, error } = subjectList;

  const infoformSave = useSelector((state) => state.infoformSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = infoformSave;

  useEffect(() => {
    dispatch(listClasses());
    dispatch(listdivision());
    dispatch(listSubjects());
    return () => {
      //
    };
  }, [successSave]);

  const [modalVisible, setModalVisible] = useState(false);
  const [stfname, setStfname] = useState("");
  const [stmname, setStmname] = useState("");
  const [stlname, setStlname] = useState("");
  const [date, setDate] = useState(new Date());
  const [placeofbirth, setPlaceofbirth] = useState("");
  const [religion, setReligion] = useState("");
  const [staddress, setStaddress] = useState("");
  const [stcontact, setStcontact] = useState("");
  const [stclass, setStclass] = useState("");
  const [stdivision, setStdivision] = useState("");
  const [stsubject, setStsubject] = useState([]);
  const [fafname, setFafname] = useState("");
  const [famname, setFamname] = useState("");
  const [falname, setFalname] = useState("");
  const [facompname, setFacompname] = useState("");
  const [fadesignation, setFadesignation] = useState("");
  const [facompaddress, setFacompaddress] = useState("");
  const [facontact, setFacontact] = useState("");
  const [faemail, setFaemail] = useState("");
  const [mofname, setMofname] = useState("");
  const [momname, setMomname] = useState("");
  const [molname, setMolname] = useState("");
  const [mocompname, setMocompname] = useState("");
  const [modesignation, setModesignation] = useState("");
  const [mocompaddress, setMocompaddress] = useState("");
  const [mocontact, setMocontact] = useState("");
  const [moemail, setMoemail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setStsubject(e.target.value)
    console.log(e);
    console.log(stclass);
    console.log(stfname);
    dispatch(
      infoformdetails({
        stfname,
        stmname,
        stlname,
        date,
        placeofbirth,
        religion,
        staddress,
        stcontact,
        stclass,
        stdivision,
        stsubject,
        fafname,
        famname,
        falname,
        facompname,
        fadesignation,
        facompaddress,
        facontact,
        faemail,
        mofname,
        momname,
        molname,
        mocompname,
        modesignation,
        mocompaddress,
        mocontact,
        moemail,
      })
    );

    e.target.reset();
  };

  const editHandler = (classdet) => {
    setModalVisible(true);
  };
 

  return (
    <div className="main-page">
      <div className={classes.root}>
        {loadingSave && <div>Loading...</div>}
        {errorSave && <div>{errorSave}</div>}
        <form
          className={classes.root}
          onSubmit={submitHandler}
          noValidate
          autoComplete="off"
        >
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className="student-details">
                <h2>Student Details</h2>
                {/* <label div="st fname">First Name:</label>
                <br /> */}
                <TextField
                  required
                  label="First Name"
                  id="stfname"
                  className={classes.textField}
                  variant="outlined"
                  value={stfname}
                  onChange={(e) => setStfname(e.target.value)}
                />
                <TextField
                  required
                  label="Middle Name"
                  id="stmname"
                  className={classes.textField}
                  variant="outlined"
                  value={stmname}
                  onChange={(e) => setStmname(e.target.value)}
                />
                <TextField
                  required
                  label="Last Name"
                  id="stlname"
                  className={classes.textField}
                  variant="outlined"
                  onChange={(e) => setStlname(e.target.value)}
                />
                <br />
                <br />
               <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  format= "dd/MM/yyyy"
                  defaultValue="01/09/2020"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setDate(e.target.value)}
                /> 
                <TextField
                  label="Place of Birth"
                  id="placeofbirth"
                  type="text"
                  className={classes.textField}
                  onChange={(e) => setPlaceofbirth(e.target.value)}
                />
                <TextField
                  label="Religion"
                  id="religion"
                  className={classes.textField}
                  onChange={(e) => setReligion(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  required
                  className={classes.textField}
                  id="staddress"
                  label="Residential Address"
                  placeholder="Please enter your address"
                  multiline
                  fullWidth
                  onChange={(e) => setStaddress(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  label="Enter your Phone number"
                  id="stcontact"
                  type="text"
                  className={classes.textField}
                  onChange={(e) => setStcontact(e.target.value)}
                />
                <br />
                <br />
                <FormControl className={classes.formControl}>
                  <FormLabel htmlFor="age-native-helper">Class:</FormLabel>

                  <NativeSelect onChange={(e) => setStclass(e.target.value)}>
                  <option value="">None</option>                  
                    {classinfo &&
                      classinfo.map((classdet) => (
                        <option value={classdet.classno}>
                          {classdet.classno}
                        </option>
                      ))}
                  </NativeSelect>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <FormLabel htmlFor="age-native-helper">Division:</FormLabel>

                  <NativeSelect onChange={(e) => setStdivision(e.target.value)}>
                  <option value="">None</option>
                    {divisioninfo &&
                      divisioninfo.map((divisiondet) => (
                        <option value={divisiondet.divname}>
                          {divisiondet.divname}
                        </option>
                      ))}
                  </NativeSelect>
                </FormControl>
                {/* <FormControl className={classes.textField}>

        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
          labelId="subjectname"
          id="subjectname"
          onChange={(e) => setStsubject(e.target.value)}
          value={stsubject || []}
          multiple
          input={<Input id="select-multiple-chip" />}
          renderValue={(subjectinfo) => (
            <div className={classes.chips}>
              {subjectinfo && subjectinfo.map((subjectdet) => (
                <Chip key={subjectdet._id} label={subjectdet.subjectname} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {subjectinfo.map((subjectdet) => (
            <MenuItem key={subjectdet._id} value={subjectdet.subjectname} >
              {subjectdet.subjectname}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <FormControl className={classes.formControl}>
      <FormLabel htmlFor="age-native-helper">Subject</FormLabel>
        <Select
          labelId="subject"
          id="subject"
          multiple
          value={stsubject || []}
          onChange={(e) => setStsubject(e.target.value)}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {subjectinfo && subjectinfo.map((subjectdet) => (
            <MenuItem key={subjectdet._id} value={subjectdet.subjectname}>
              <Checkbox checked={stsubject.indexOf(subjectdet.subjectname) > -1} />
              <ListItemText primary={subjectdet.subjectname} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="father-details">
                <h2>Father Details</h2>
                <TextField
                  required
                  label="First Name"
                  id="fafname"
                  className={classes.textField}
                  variant="outlined"
                  onChange={(e) => setFafname(e.target.value)}
                />
                <TextField
                  required
                  label="Middle Name"
                  id="famname"
                  className={classes.textField}
                  variant="outlined"
                  onChange={(e) => setFamname(e.target.value)}
                />
                <TextField
                  required
                  label="Last Name"
                  id="falname"
                  className={classes.textField}
                  variant="outlined"
                  onChange={(e) => setFalname(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  label="Company Name"
                  id="facompname"
                  className={classes.textField}
                  onChange={(e) => setFacompname(e.target.value)}
                />

                <TextField
                  label="Designation"
                  id="fadesignation"
                  className={classes.textField}
                  onChange={(e) => setFadesignation(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  required
                  id="facompaddress"
                  label="Company Address"
                  placeholder="Please enter your company address"
                  multiline
                  fullWidth
                  className={classes.textField}
                  onChange={(e) => setFacompaddress(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  label="Enter your Phone number"
                  id="facontact"
                  type="text"
                  className={classes.textField}
                  onChange={(e) => setFacontact(e.target.value)}
                />
                <TextField
                  label="Email Address"
                  id="faemail"
                  className={classes.textField}
                  type="email"
                  name="email"
                  onChange={(e) => setFaemail(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="mother-details">
                <h2>Mother Details</h2>
                <TextField
                  required
                  label="First Name"
                  id="mofname"
                  className={classes.textField}
                  variant="outlined"
                  onChange={(e) => setMofname(e.target.value)}
                />
                <TextField
                  required
                  label="Middle Name"
                  id="momname"
                  className={classes.textField}
                  variant="outlined"
                  onChange={(e) => setMomname(e.target.value)}
                />
                <TextField
                  required
                  label="Last Name"
                  id="molname"
                  className={classes.textField}
                  variant="outlined"
                  onChange={(e) => setMolname(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  label="Company Name"
                  id="mocompname"
                  className={classes.textField}
                  onChange={(e) => setMocompname(e.target.value)}
                />

                <TextField
                  label="Designation"
                  id="modesignation"
                  className={classes.textField}
                  onChange={(e) => setModesignation(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  required
                  id="mocompaddress"
                  label="Company Address"
                  placeholder="Please enter your company address"
                  multiline
                  fullWidth
                  className={classes.textField}
                  onChange={(e) => setMocompaddress(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  label="Enter your Phone number"
                  id="mocontact"
                  type="text"
                  className={classes.textField}
                  onChange={(e) => setMocontact(e.target.value)}
                />
                <TextField
                  label="Email Address"
                  id="moemail"
                  className={classes.textField}
                  type="email"
                  name="email"
                  onChange={(e) => setMoemail(e.target.value)}
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  label="Upload Image"
                  color="default"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
                <br />
                <br />
              </div>
            </Grid>
          </Grid>
          
          <ColorButton
            type="submit"
            variant="contained"
            color="primary"
            className={classes.textField}

          >
            Submit
          </ColorButton>
          <Link to="/admin">
            <ColorButton
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.textField}
              style={styles}
            >
              Back
            </ColorButton>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterationForm;
