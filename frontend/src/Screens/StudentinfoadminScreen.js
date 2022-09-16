import React, { useState, useEffect } from "react";
import { Route, Link, Redirect,useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { listinfoform, deleteInfo} from "../actions/infoformactions";
import Grid from "@material-ui/core/Grid";
import RegisterationForm from "./RegisterationForm";
import SearchBar from "material-ui-search-bar";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function StudentinfoadminScreen(props) {
  const classes = useStyles();

  const infoformList = useSelector((state) => state.infoformList);
  console.log("studentlist :::: ", infoformList);
  const { loading, studentinfo, error } = infoformList;

  const infoDelete = useSelector((state) => state.infoDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = infoDelete;

  var columns = [
    {title: "Id", field:"_id"},
    { title: "Name", field: "stfname" },
    {title: "MiddleName", field: "stmname"},
    { title: "Surname", field: "stlname" },
    { title: "Birth Year", field: "date", type: "date", format:'dd/MM/YYYY' },
    {title: "Class", field: "stclass", type: "numeric"},
    {title: "Division", field: "stdivision"}
    
  ];

  const [data, setData] = useState([]);

  

  const deleteHandler = (rowData) => {
    dispatch(deleteInfo(rowData._id))
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listinfoform());
    return () => {
      //
    };
  }, [successDelete]);



  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Link to="/infoform/:id">
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.margin}
            >
              Create
            </Button>
          </Link>
        </Grid>
        <br />
        <Grid item xs={12}>
        
          <MaterialTable
            key={studentinfo._id}
            title="Editable Example"
            columns={columns}
            data={studentinfo}
             actions={[
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => deleteHandler(rowData) 
              },
 
              {
                icon: 'edit',
                tooltip: 'Edit User',
              },
              
            ]}
            options={{
              actionsColumnIndex: -1
            }}
             components={{
               Action1: props => (
                <Button
                  color="primary"
                  variant="contained"
                  style={{textTransform: 'none'}}
                  size="small"
                >
                  Delete
                  </Button>
              ), 
              
               Action: rowData => (
                <Link to={`/infoform/${rowData._id}`}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{textTransform: 'none'}}
                  size="small"
                >
                  Edit
                  </Button></Link>
              ),
            }}
                      />
        </Grid>
      </Grid>
    </div>
  );
}

export default StudentinfoadminScreen;
