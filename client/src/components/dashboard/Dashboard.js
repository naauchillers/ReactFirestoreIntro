import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import './Dashboard.css'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
class Dashboard extends Component {
    
  render() {
    const { projects, auth, notifications} = this.props;
    if (!auth.uid) return <Redirect to='/signin' />  
    return (
        <MDBContainer>
          <MDBRow>
            <MDBCol><ProjectList projects={projects} /> </MDBCol>
          </MDBRow>
          <MDBRow>
            <Notifications notifications={notifications} />
          </MDBRow>
        </MDBContainer>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notification
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', limit: 3, orderBy: ['createdAt', 'desc']},
    { collection: 'notification', limit: 5, orderBy: ['time', 'desc']}
  ])
)(Dashboard)