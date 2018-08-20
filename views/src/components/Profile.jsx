import React, { Component, Button } from 'react';
import Action from './Action.js';

export default class Profile extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.context.router.push({ pathname: `/${this._input.value}` });
  }

  render() {
    const user = "John Doe",
      jobTitle = "Project manager",
      phoneNo = "0732405896",
      email = "johndoe@softvision.ro",
      shortBio = "I'm a car enthusiast and a proud workaholic.";
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
            <Action text="Edit Profile" />
          </ul>
        </div>

        <div className="profile-page-edit-container">
          <form className="profile-page-edit-form">
            <p>Change your profile picture:</p>
            <form action="/action_page.php">
              <input type="file" name="pic" accept="image/*"/>
                <input type="submit"/>
              </form>
              <label className="form-content">
                
                <p>Name:<input type="text" placeHolder="John Doe" onChange={this.handleChange} /></p>
                <p>Position:<input type="text" placeHolder="Project manager" onChange={this.handleChange} /></p>
                <p>Phone number:<input type="text" placeHolder="0732405896" onChange={this.handleChange} /></p>
                <p>Email:<input type="text" placeHolder="john.doe@softvision.ro" onChange={this.handleChange} /></p>
                <p>Short bio:<input type="text" placeHolder="I'm a car enthusiast and a proud workaholic." onChange={this.handleChange} /></p>

              </label>
            </form>
          </div>
        </div>
          );
        }
      }
      //
// Profile.contextTypes = {
//   router: React.PropTypes.object.isRequired,
// }
