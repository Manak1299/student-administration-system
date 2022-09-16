import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector, useDispatch } from "react-redux";
import {
  divisiondetails,
  listdivision,
  deletedivision,
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

function DivisionScreen(props) {
  const divisionList = useSelector((state) => state.divisionList);
  console.log("Divisionlist :::: ", divisionList);
  const { loading, divisioninfo, error } = divisionList;
  const divisionSave = useSelector((state) => state.divisionSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = divisionSave;

  const divisionDelete = useSelector((state) => state.divisionDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = divisionDelete;

  const dispatch = useDispatch();
  const classes = useStyles();

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [divname, setDivname] = useState("");
  const [classno, setClassno] = useState("");
  const [divdesc, setDivdesc] = useState("");
  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listdivision());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const editHandler = (divisiondet) => {
    setModalVisible(true);
    setId(divisiondet._id);
    setDivname(divisiondet.divname);
    setClassno(divisiondet.classno);
    setDivdesc(divisiondet.divdesc);
  };

  const deleteHandler = (divisiondet) => {
    dispatch(deletedivision(divisiondet._id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(divisiondetails({ _id: id, divname, classno, divdesc }));
  };
  console.log(divisioninfo);
  return (
    <div>
      <h1>Division Screen</h1>

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
            {id ? "Update Division" : "Create Division"}
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
                id="divname"
                label="Division Name"
                type="text"
                fullWidth
                value={divname}
                onChange={(e) => setDivname(e.target.value)}
              />
              <TextField
                required
                id="classno"
                label="Class Number"
                type="text"
                fullWidth
                value={classno}
                onChange={(e) => setClassno(e.target.value)}
              />
               <TextField
                required
                id="divdesc"
                label="Division Description"
                multiline
                fullWidth
                rowsMax={4}
                value={divdesc}
                onChange={(e) => setDivdesc(e.target.value)}
              /> 
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
              <TableCell>Division</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {divisioninfo &&
              divisioninfo.map((divisiondet) => (
                <TableRow key={divisiondet._id}>
                  <TableCell component="th" scope="row">
                    {divisiondet._id}
                  </TableCell>
                  <TableCell>{divisiondet.divname}</TableCell>
                  <TableCell>{divisiondet.classno}</TableCell>
                  <TableCell>{divisiondet.divdesc}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => editHandler(divisiondet)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteHandler(divisiondet)}
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
export default DivisionScreen;
