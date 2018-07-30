import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react'
import { logout } from '../actions/index'

import { withRouter } from 'react-router';

class Navbar extends React.Component {
  state = { activeItem: ''}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogOut = () => {
    localStorage.clear()
    this.props.logout()
    this.props.history.push('/login')
  }

  render() {
    const { activeItem } = this.state
    console.log("navbar")
    debugger;
    return (
      <div>
        { !!this.props.current_user.user_id
          ?
          <Menu secondary>
            <Menu.Item
              as={ Link }
              to='/dashboard/form'
              name='input'
              active={activeItem === 'input'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ Link }
              to='/dashboard/charts'
              name='charts'
              active={activeItem === 'charts'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ Link }
              to='/dashboard/entries'
              name='entries'
              active={activeItem === 'entries'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='logout'
                onClick={this.handleLogOut}
              />
            </Menu.Menu>
          </Menu>
          :
          <Menu secondary>
            <Menu.Item
              as={ Link }
              to='/login'
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ Link }
              to='/about'
              name='about'
              active={activeItem === 'about'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ Link }
              to='/signup'
              name='signup'
              active={activeItem === 'signup'}
              onClick={this.handleItemClick}
            />
          </Menu>
        }
        </div>
      )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default withRouter(connect(mapStateToProps, { logout })(Navbar))
