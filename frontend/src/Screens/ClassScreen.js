import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector, useDispatch } from "react-redux";
import {
  classdetails,
  listClasses,
  deleteClass,
} from "../actions/classactions";
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

function ClassScreen(props) {
  const classList = useSelector((state) => state.classList);
  console.log("Classlist :::: ", classList);
  const { loading, classinfo, error } = classList;
  const classSave = useSelector((state) => state.classSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = classSave;

  const classDelete = useSelector((state) => state.classDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = classDelete;

  const dispatch = useDispatch();
  const classes = useStyles();

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [classno, setClassno] = useState("");
  const [division, setDivision] = useState("");

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listClasses());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const editHandler = (classdet) => {
    setModalVisible(true);
    setId(classdet._id);
    setClassno(classdet.classno);
    setDivision(classdet.division);
  };

  const deleteHandler = (classdet) => {
    dispatch(deleteClass(classdet._id));
  };

  const submitHandler = (e, classdet) => {
    e.preventDefault();
    dispatch(classdetails({ _id: id, classno }));
  };
  console.log(classinfo);
  return (
    <div>
      <h1>Class Screen</h1>

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
            {id ? "Update Class" : "Create Class"}
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
                id="classno"
                label="Class Number"
                type="number"
                fullWidth
                value={classno}
                onChange={(e) => setClassno(e.target.value)}
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
              <TableCell>Class</TableCell>
              {/* <TableCell>Division</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {classinfo &&
              classinfo.map((classdet) => (
                <TableRow key={classdet._id}>
                  <TableCell component="th" scope="row">
                    {classdet._id}
                  </TableCell>
                  <TableCell>{classdet.classno}</TableCell>
                  {/* <TableCell>{classdet.division}</TableCell> */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => editHandler(classdet)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteHandler(classdet)}
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
export default ClassScreen;
