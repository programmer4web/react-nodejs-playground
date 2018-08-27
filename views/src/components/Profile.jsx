import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import axios from 'axios';

let errors = {};
export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      editedUser: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        email: '',
        phoneNo: '',
        shortBio: '',
      }
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhoneNo = this.validatePhoneNo.bind(this);
    this.change = this.change.bind(this);
  }


  change(e) {
    const state = this.state;
    const name = e.target.name;
    const value = e.target.value;
    const err1 = this.validateEmail(name, value);
    const err2 = this.validatePhoneNo(name, value);

    console.log(err1, err2);

    this.setState(
      Object.assign({}, state, {
        editedUser: Object.assign({}, state.editedUser, { [name]: e.target.value }),
        ...errors
      })
    );

  }


  validateEmail(name, value) {
    let isError = false;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    if ((name === "email" || name === "submit") && value.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires the `@` character.";
    }
    else if (name === "email") {
      isError = false;
      errors.emailError = "";
    }
    if ((name === "email" || name === "submit") && !re.test(value)) {
      isError = true;
      errors.emailError += " The email should contain a domain.";
    }

    return isError;
  }

  validatePhoneNo(name, value) {
    let isError = false;

    const re = /^[0-9\b]+$/;

    if ((name === "phoneNo" || name === "submit") && value.length < 5) {
      isError = true;
      errors.phoneNoError = "Phone number must be at least 5 numbers long";
    }
    else if (name === "phoneNo") {
      isError = false;
      errors.phoneNoError = "";
    }
    if ((name === "phoneNo" || name === "submit") && !re.test(value)) {
      isError = true;
      errors.phoneNoError += " The phone number should be only numbers."
    }
    return isError;
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.editedUser);
    const err1 = this.validatePhoneNo("submit", this.state.editedUser.phoneNo);
    const err2 = this.validateEmail("submit", this.state.editedUser.email);
    console.log("eroare:", err1, "+", err2);
    if (!err1 && !err2) {
      axios.put(`${this.props.serverUrl}users/5b646febeebb915ff8b221be`,
        {
          name: {
            first: this.state.editedUser.firstName,
            last: this.state.editedUser.lastName
          },
          position: this.state.editedUser.jobTitle,
          email: this.state.editedUser.email,
          phone: this.state.editedUser.phoneNo,
          bio: this.state.editedUser.shortBio
        }
      )
      this.setState(
        Object.assign({}, this.state, {
          editedUser: Object.assign({}, {
            firstName: '',
            lastName: '',
            jobTitle: '',
            email: '',
            phoneNo: '',
            shortBio: ''
          })
        })

      );
    }
  }

  // handleEditProfile(){
  //   this.setState({
  //     formVisible: !this.state.formVisible
  //   });
  // }

  render() {
    let classNames = "profile-page-edit-container";
    // if (this.state.formVisible == false) classNames += " hidden";



    return (
      <div className="profile-page-container">
        <div className="profile-page-image">
          <img src="https://www.w3schools.com/w3images/avatar2.png" className="profile-page-image-content" alt="Avatar" />
        </div>
        <div className="profile-page-title">
          <h3>{this.props.user.name.first + " " + this.props.user.name.last}</h3>
          <h4>{this.props.user.name.position}</h4>
        </div>
        <div className="profile-page-information">
          <ul className="profile-page-information-list">
            <li><p><img src="https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/phone-call-active-512.png" className="icon-image" />{this.props.user.phone}</p></li>
            <li><p><img src="https://cdn1.iconfinder.com/data/icons/education-set-01/512/email-open-512.png" className="icon-image" />{this.props.user.email}</p></li>
            <li><p><img src="https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png" className="icon-image" />{this.props.user.bio}</p></li>
            <div className="custom-button" onClick={this.handleEditProfile}>Edit Profile
            </div>
          </ul>
        </div>

        <div className={classNames} >

          <form className="profile-page-edit-form" method="post" action={`${this.props.serverUrl}users/`}>
            <p>Change your profile picture:</p>
            <input type="file" className="custom-button" name="pic" accept="image/*" />


            <div className="form-content">

              <div>First name: <TextField name="firstName" placeholder="First name"
                errorText={this.state.firstNameError}
                onChange={e => this.change(e)} /></div>
              <div>Last name: <TextField name="lastName" placeholder="Last name"
                errorText={this.state.lastNameError}

                onChange={e => this.change(e)} /></div>
              <div>Position: <TextField name="jobTitle" placeholder="Position"

                errorText={this.state.jobTitleError}
                onChange={e => this.change(e)} /></div>
              <div>Phone number: <TextField name="phoneNo" placeholder="Phone number"
                errorText={this.state.phoneNoError}
                onChange={e => this.change(e)} /></div>
              <div>Email:<TextField name="email" placeholder="Email"
                errorText={this.state.emailError}
                onChange={e => this.change(e)} /></div>
              <div>Short bio:<TextField name="shortBio" placeholder="Short bio"
                errorText={this.state.shortBioError}
                onChange={e => this.change(e)} /></div>



            </div>
            {/* <input type="submit" className="action" /> */}
            <button name="submit" className="custom-button" onClick={e => this.onSubmit(e)}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
//
Profile.propTypes = {
  serverUrl: PropTypes.string,
  user: PropTypes.object,
  handleEditProfile: PropTypes.func
}



// import React, {Component} from 'react';
        // import PropTypes from 'prop-types';

// export default class Profile extends Component {
//   user = {
//     firstName:'',
//     lastName:'',
//     jobTitle:'',
//     email:'',
//     phoneNo:'',
//     shortBio:'',
//   }
//   render() {
//     // const user = "John Doe",
//     //   jobTitle = "Project manager",
//     //   phoneNo = "0732405896",
//     //   email = "johndoe@softvision.ro",
//     //   shortBio = "I'm a car enthusiast and a proud workaholic.";
//     let classNames = "profile-page-edit-container";
//     if (this.state.formVisible == false) classNames += " hidden";



//     return (
//       <div className="profile-page-container">
//         <div className="profile-page-image">
//           <img src="https://www.w3schools.com/w3images/avatar2.png" className="profile-page-image-content" alt="Avatar" />
//         </div>
//         <div className="profile-page-title">
//           <h3>{this.user.firstName+""+this.user.lastName}</h3>
//           <h4>{jobTitle}</h4>
//         </div>
//         <div className="profile-page-information">
//           <ul className="profile-page-information-list">
//             <li><p><img src="https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/phone-call-active-512.png" className="icon-image" />{phoneNo}</p></li>
//             <li><p><img src="https://cdn1.iconfinder.com/data/icons/education-set-01/512/email-open-512.png" className="icon-image" />{email}</p></li>
//             <li><p><img src="https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png" className="icon-image" />{shortBio}</p></li>
//             <div className="action" onClick={this.handleEditProfile}>Edit Profile
//             </div>
//           </ul>
//         </div>

//         <div className={classNames} >

//           <form className="profile-page-edit-form" method="post" action={`${this.props.serverUrl}users/`}>
//             <p>Change your profile picture:</p>
//             <input type="file" className="action" name="pic" accept="image/*" />


//             <div className="form-content">

//               <p>Name:<input type="text " name="name" required placeholder="John Doe" onChange={this.handleChange} /></p>
//               <p>Position:<input type="text" name="position" placeholder="Project manager" onChange={this.handleChange} /></p>
//               <p>Phone number:<input type="number" name="phone" required placeholder="0732405896" onChange={this.handleChange} /></p>
//               <p>Email:<input type="email" name="email" required placeholder="john.doe@softvision.ro" onChange={this.handleChange} /></p>
//               <p>Short bio:<input type="text" name="bio" placeholder="I'm a car enthusiast and a proud workaholic." onChange={this.handleChange} /></p>



//             </div>
//             <input type="submit" className="action" />
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
// //
// Profile.propTypes = {
//   serverUrl: PropTypes.string,
//   user: PropTypes.object,
//   handleEditProfile: PropTypes.func
// }
