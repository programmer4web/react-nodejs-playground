import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      formVisible:false
    };
    this.handleEditProfile=this.handleEditProfile.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.context.router.push({ pathname: `/${this._input.value}` });

  }
  handleEditProfile() {
    this.setState({ formVisible: !this.state.formVisible });
  }

  render() {
    const user = "John Doe",
      jobTitle = "Project manager",
      phoneNo = "0732405896",
      email = "johndoe@softvision.ro",
      shortBio = "I'm a car enthusiast and a proud workaholic.";
    let classNames = "profile-page-edit-container";
    if (this.state.formVisible == false) classNames += " hidden";



    return (
      <div className="profile-page-container">
        <div className="profile-page-image">
          <img src="https://www.w3schools.com/w3images/avatar2.png" className="profile-page-image-content" alt="Avatar" />
        </div>
        <div className="profile-page-title">
          <h3>{user}</h3>
          <h4>{jobTitle}</h4>
        </div>
        <div className="profile-page-information">
          <ul className="profile-page-information-list">
            <li><p><img src="https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/phone-call-active-512.png" className="icon-image" />{phoneNo}</p></li>
            <li><p><img src="https://cdn1.iconfinder.com/data/icons/education-set-01/512/email-open-512.png" className="icon-image" />{email}</p></li>
            <li><p><img src="https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png" className="icon-image" />{shortBio}</p></li>
            <div className="action" onClick={this.handleEditProfile}>Edit Profile
            </div>
          </ul>
        </div>

        <div className={classNames} >

          <form className="profile-page-edit-form" method="post" action={`${this.props.serverUrl}users/`}>
            <p>Change your profile picture:</p>
            <input type="file" className="action" name="pic" accept="image/*" />


            <div className="form-content">

              <p>Name:<input type="text " name="name" required placeholder="John Doe" onChange={this.handleChange} /></p>
              <p>Position:<input type="text" name="position" placeholder="Project manager" onChange={this.handleChange} /></p>
              <p>Phone number:<input type="number" name="phone" required placeholder="0732405896" onChange={this.handleChange} /></p>
              <p>Email:<input type="email" name="email" required placeholder="john.doe@softvision.ro" onChange={this.handleChange} /></p>
              <p>Short bio:<input type="text" name="bio" placeholder="I'm a car enthusiast and a proud workaholic." onChange={this.handleChange} /></p>



            </div>
            <input type="submit" className="action" />
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
