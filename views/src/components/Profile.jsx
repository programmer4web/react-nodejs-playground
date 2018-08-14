import React, { Component, Button } from 'react';

export default class Profile extends Component {
  handleSubmit (e) {
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
              {/* <li><Button bsStyle="primary">Edit profile</Button></li> */}
            </ul>
          </div>
        </div>
    );
  }
}
//
// Profile.contextTypes = {
//   router: React.PropTypes.object.isRequired,
// }
