import React, { Component } from 'react';
import { Link } from 'react-router';

class NavBarPublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const { isToggleOn } = this.state;

    const _render = (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Kanban</Link>
            <button
              aria-expanded="false"
              className="navbar-toggle collapsed"
              onClick={this.handleClick}
              type="button"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={(isToggleOn ? 'navbar-collapse collapse' : 'navbar-collapse')}>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li><Link to="signup">SignUp</Link></li>
              <li><Link to="login">Login</Link></li>
            </ul>

          </div>
        </div>
      </div>
    );
    return (
      _render
    );
  }
}
export default NavBarPublic;
