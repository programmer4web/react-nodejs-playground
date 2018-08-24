import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import axios from 'axios';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      jobTitle: '',
      jobTitleError: '',
      email: '',
      emailError: '',
      phoneNo: '',
      phoneNoError: '',
      shortBio: '',
      shortBioError: '',
    }
  }
  change(e) {
    const name = e.target.name;
    this.validate(name);

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  validate(name) {
    let isError = false;
    let errors = {};
    if ((name === "phoneNo" || name === "submit") && this.state.phoneNo.length < 5) {
      isError = true;
      errors.phoneNoError = "Phone number must be at least 5 numbers long";
    }
    else if (name === "phoneNo") {
      isError = false;
      errors.phoneNoError = null;
    }


    if ((name === "email" || name === "submit") && this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
    }
    else if (name === "email") {
      isError = false;
      errors.emailError = null;
    }
    this.setState({
      ...this.state,
      ...errors
    })


    return isError;
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const err = this.validate();
    console.log("eroare:",err);
    if (!err) {
      axios.put(`${this.props.serverUrl}users/5b646febeebb915ff8b221be`,
      {
        name:{
          first: this.state.firstName,
          last:this.state.lastName},
        position :this.state.jobTitle,
        email:this.state.email,
        phone:this.state.phoneNo,
        bio:this.state.shortBio
      }
    )
      this.setState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        email: '',
        phoneNo: '',
        shortBio: ''
      });
    }
  }

  render() {
    // const user = "John Doe",
    //   jobTitle = "Project manager",
    //   phoneNo = "0732405896",
    //   email = "johndoe@softvision.ro",
    //   shortBio = "I'm a car enthusiast and a proud workaholic.";
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
                defaultValue={this.state.firstName}
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
