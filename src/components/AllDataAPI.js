import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Button, Card } from 'react-bootstrap';

const axios = require('axios');
const url = 'https://exam301backendmoegts.herokuapp.com';

class AllDataAPI extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataApi: [],
        }
    }

    async componentDidMount() {
        let dataApi = await axios.get(`${url}/getData`);
        this.setState({ dataApi: dataApi.data })
    }
    addfav = async(e) => {
        await axios.patch(`${url}/addToFav/${e}/${this.props.auth0.user.email}`);
    }
    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>

                {
                    this.state.dataApi.map(e => {
                        return (
                            <Card key={e.id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={e.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{e.title}</Card.Title>
                                    <Card.Title>{e.dateCreated}</Card.Title>
                                    <Card.Text>
                                        {e.description}
                                    </Card.Text>
                                    <Button onClick={() => { this.addfav(e.id) }} variant="primary">Add Fav</Button>
                                </Card.Body>
                            </Card>
                        )

                    })
                }
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
