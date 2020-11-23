import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { Styles } from "../../styles/user";
import { createBrowserHistory } from "history";
import "../../styles/user.css";
import {
    getUsers,
    getUsersSuccess,
    getUsersFailure,
    updateUser,
    updateUserSuccessfully,
    updateUserFailure
} from "../../redux/action/userActions";
import { TramRounded } from "@material-ui/icons";
 
export const history = createBrowserHistory({
  forceRefresh: true,
});

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 5,
      page: 0,
      open: false,
      openModal: false,
      updateId:"",
      updateName:"",
      updateGender:"",
      updateStatus:"",
      updateEmail:"",
      name:"",
      email:"",
      status:"",
      gender:""
    };
  }
  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }
  handleChangePage(event, newPage) {
    this.setState({
      page: newPage,
    });
  }
  handleUpdateUser(){
    const {name,email,status,gender} =  this.state;
    const userId= this.state.updateId;
    const {updateUser} = this.props;
    updateUser(userId,name,email,status,gender);
  }
  handleOpenModal(row){
    this.setState({
      openModal:true,
      updateId:row.id,
      updateName:row.name,
      updateGender:row.gender,
      updateStatus:row.status,
      updateEmail:row.email
    })
  }
  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  }
  handleCloseModal() {
    this.setState({
      openModal: false,
    });
  }
  handleClose() {
    this.setState({
      openSnackBar: false,
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  componentDidUpdate(prevProps) {
		if (this.props.updateMessage !== prevProps.updateMessage) {
      const { getUsers } = this.props;
      getUsers();
		}
	}

  render() {
    const { classes } = this.props;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        (this.props.userData ? this.props.userData.length : 0) -
          this.state.page * this.state.rowsPerPage
      );
    return (
      <div className="requests-container">

        <div className="home-upbar">
TENSORGO USERS DATA
        </div>

        {/* start of Modal */}
                <div className="update-user-title-container">
          {/* Start of modal section */}
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.popUp}
            open={this.state.openModal}
          >
            <div className={classes.modal}>
              {this.props.isCreatedFailure === true ? (
                <Alert severity="error">
                  Oops error ocurred please try after some time{" "}
                </Alert>
              ) : (
                ""
              )}
              {this.props.isCreatedSuccess === true ? (
                <Alert severity="success">
                  User was updated successfully please close the modal!
                </Alert>
              ) : (
                ""
              )}
              <div>
                <CloseIcon
                  className={classes.CloseIcon}
                  onClick={this.handleCloseModal.bind(this)}
                />
              </div>
              <div className="modal-title">
                Fill in the details to update user
              </div>
              <div className="modal-form-container">
                <form>
                  <TextField
                    id="outlined-basic"
                    label={this.state.updateName}
                    variant="outlined"
                    className={classes.TextField}
                    name="name"
                    onChange={this.handleChange.bind(this)}
                  />
                  <Box m={2} />
                  <TextField
                    id="outlined-basic"
                    label={this.state.updateEmail}
                    variant="outlined"
                    className={classes.TextField}
                    name="email"
                    onChange={this.handleChange.bind(this)}
                  />
                  <Box m={2} />
                  <Autocomplete
              id="combo-box-demo"
              options={gender}
              getOptionLabel={(option) => option.genderName}
              style={{ width: 300 }}
              onChange={(e, value) => {
                this.setState({
                  gender: value.genderName,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={this.state.updateGender}
                  variant="outlined"
                  className={classes.TextField}
                />
              )}
            />
                  <Box m={2} />
                  <Autocomplete
              id="combo-box-demo"
              options={status}
              getOptionLabel={(option) => option.statusName}
              style={{ width: 300 }}
              onChange={(e, value) => {
                this.setState({
                  status: value.statusName,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={this.state.updateStatus}
                  variant="outlined"
                  className={classes.TextField}
                />
              )}
            />
                  <Box m={2} />
                  <Button
                    className={classes.Button}
                    variant="contained"
                    color="primary"
                    onClick={this.handleUpdateUser.bind(this)}
                    // disabled={this.shouldBeDisabled()}
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          </Modal>
        </div>
        {/* End of Modal*/}
        <div className="requests-title">View All users</div>
        <div className="table-section-container">
          <div className="category-section">
          </div>
          <div>
            <Paper className={classes.paper}>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                  size="small"
                >
                  <TableHead className={classes.tableHeader}>
                    <TableRow>
                      <TableCell align="left" className={classes.tableCell}>
                        Name
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        Email
                      </TableCell>
                      <TableCell
                        numeric
                        align="left"
                        className={classes.tableCell}
                      >
                        Gender
                      </TableCell>
                      <TableCell
                        numeric
                        align="center"
                        className={classes.tableCell}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.props.userData
                      ? this.props.userData
                          .slice(
                            this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage +
                              this.state.rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                                padding="checkbox"
                                style={{ cursor: "pointer" }}
                                onClick={()=>{this.handleOpenModal(row)}}
                              >
                                <TableCell
                                  component="th"
                                  scope="row"
                                  className={classes.tableCellContainer}
                                >
                                  <span className="nameInitial">
                                    {row.name.charAt(0)}
                                  </span>
                                  {row.name} 
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  className={classes.tableCellContainer}
                                >
                    
                                  {row.email}
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  className={classes.tableCellContainer}
                                >
                    
                                  {row.gender}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.tableCellContainer}
                                  style={
                                    row.status === "active"
                                      ? { color: "green" }
                                       :{color: "red"}
                                  }
                                >
                                  {row.status}
                                </TableCell>
                              </TableRow>
                            );
                          })
                      : null}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid container>
                <Grid item xs={12}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={
                      this.props.userData ? this.props.userData.length : 0
                    }
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage.bind(this)}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(
                      this
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
const gender = [
  { genderName: "Male" },
  { genderName: "Female" },
  { genderName: "Both" },
];
const status = [
  { statusName: "Active" },
  { statusName: "Inactive" },
];
export const mapStateToProps = (state) => {
  return {
    userData: state.userReducer.data,
    updateMessage:state.userReducer.message,
    isCreatedSuccess: state.userReducer.isCreatedSuccess,
    isCreatedFailure: state.userReducer.isCreatedFailure,
  };
};
const connectedUserPage = connect(mapStateToProps, {
    getUsers,
    getUsersSuccess,
    getUsersFailure,
    updateUser,
    updateUserSuccessfully,
    updateUserFailure
})(withStyles(Styles)(User));

export default connectedUserPage;
