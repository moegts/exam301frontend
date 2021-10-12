import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import { Button, Card, Modal, Form } from 'react-bootstrap';

const axios = require('axios');
const url = 'https://exam301backendmoegts.herokuapp.com';

class MyFavorites extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: [],
      showForm: false,
      idUpdate: "",
      title: '',
      dateCreated: '',
      description: '',
      imageUrl: ''
    }
  }

  async componentDidMount() {
    let userData = await axios.get(`${url}/getUserData/${this.props.auth0.user.email}`);
    this.setState({ userData: userData.data.list });
    this.componentDidMount();
  }

  deleteIteam = async (e) => {
    await axios.delete(`${url}/deleteItem/${e}/${this.props.auth0.user.email}`);
    this.componentDidMount();
  }


  updateItem = async (e) => {
    this.setState({
      idUpdate: e,
      showForm: true
    })
  }

  handleClose = () => {
    this.setState({
      showForm: false
    })
  }
  handleclick = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  sendFormData = async (e) => {
    e.preventDefault();
    let urlUpdate = `${url}/updateItem/${this.state.idUpdate}/${this.props.auth0.user.email}`;
    let data = {
      title: this.state.title,
      dateCreated: this.state.dateCreated,
      description: this.state.description,
      imageUrl: this.state.imageUrl
    }
    await axios.patch(urlUpdate,data);
    this.componentDidMount();
  }

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {
          this.state.userData.map(e => {
            return (
              <Card key={e.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={e.imageUrl} />
                <Card.Body>
                  <Card.Title>{e.title}</Card.Title>
                  <Card.Title>{e.dateCreated}</Card.Title>
                  <Card.Text>
                    {e.description}
                  </Card.Text>
                  <Button onClick={() => { this.deleteIteam(e.id) }} variant="primary">Delete</Button>
                  <Button onClick={() => { this.updateItem(e.id) }} variant="primary">Update</Button>
                </Card.Body>
              </Card>
            )

          })
        }
        <div>
          <Modal show={this.state.showForm} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form onSubmit={this.sendFormData}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>title:</Form.Label>
                  <Form.Control type="text" name="title" placeholder="title" onChange={this.handleclick} />

                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>description:</Form.Label>
                  <Form.Control type="text" name="description" placeholder="description" onChange={this.handleclick} />

                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>dateCreated:</Form.Label>
                  <Form.Control type="text" name="dateCreated" placeholder="dateCreated" onChange={this.handleclick} />

                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>imageUrl:</Form.Label>
                  <Form.Control type="text" name="imageUrl" placeholder="imageUrl" onChange={this.handleclick} />

                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleClose}>
                  Update it
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    )
  }
}

export default withAuth0(MyFavorites);

