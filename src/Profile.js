import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <> { isAuthenticated &&
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>Hello {user.name}</h2>
                    <p>{user.name}</p>
                </div>
            }
            </>
        )
    }
}

export default withAuth0(Profile);