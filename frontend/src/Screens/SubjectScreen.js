import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSubject,
  listSubjects,
  subjectdetails
} from "../actions/subjectactions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

function SubjectScreen(props) {
  const subjectList = useSelector((state) => state.subjectList);
  console.log("Subjectlist :::: ", subjectList);
  const { loading, subjectinfo, error } = subjectList;
  const subjectSave = useSelector((state) => state.subjectSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = subjectSave;

  const subjectDelete = useSelector((state) => state.subjectDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = subjectDelete;

  const dispatch = useDispatch();
  const classes = useStyles();

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [subjectname, setSubjectname] = useState("");
 
  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listSubjects());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const editHandler = (subjectdet) => {
    setModalVisible(true);
    setId(subjectdet._id);
    setSubjectname(subjectdet.subjectname);
  };

  const deleteHandler = (subjectdet) => {
    dispatch(deleteSubject(subjectdet._id));
  };

  const submitHandler = (e, subjectdet) => {
    e.preventDefault();
    dispatch(subjectdetails({ _id: id, subjectname }));
  };
  console.log(subjectinfo);
  return (
    <div>
      <h1>Subject Screen</h1>

      <Button
        variant="contained"
        onClick={() => editHandler({})}
        size="large"
        color="primary"
        className={classes.margin}
      >
        Create
      </Button>
      {modalVisible && (
        <Dialog
          open={modalVisible}
          onClose={() => setModalVisible(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {id ? "Update Subject" : "Create Subject"}
          </DialogTitle>

          <form
            className={classes.root}
            onSubmit={submitHandler}
            noValidate
            autoComplete="off"
          >
            {loadingSave && <div>Loading...</div>}
            {errorSave && <div>{errorSave}</div>}
            <DialogContent>
              <TextField
                required
                id="subjectname"
                label="Subject Name"
                type="text"
                fullWidth
                value={subjectname}
                onChange={(e) => setSubjectname(e.target.value)}
              />
              {/* <TextField
                required
                id="division"
                label="Division"
                type="text"
                fullWidth
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              /> */}
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                {id ? "Update" : "Create"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setModalVisible(false)}
              >
                Back
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {" "}
              <TableCell>Id</TableCell>
              <TableCell>Subject</TableCell>
              {/* <TableCell>Division</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectinfo &&
              subjectinfo.map((subjectdet) => (
                <TableRow key={subjectdet._id}>
                  <TableCell component="th" scope="row">
                    {subjectdet._id}
                  </TableCell>
                  <TableCell>{subjectdet.subjectname}</TableCell>
                  {/* <TableCell>{classdet.division}</TableCell> */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => editHandler(subjectdet)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteHandler(subjectdet)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SubjectScreen;