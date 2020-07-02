import React, { Component } from 'react';
import './FavoriteList.scss';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

class FavoriteList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        this.getFavoriteUser();
    }

    getFavoriteUser() {
        var users = localStorage.getItem('users');
        if (!users) {
            users = [];
            this.setState({ users });
            return;
        }

        users = JSON.parse(users);
        this.setState({ users })
    }

    deleteAllUser() {
        localStorage.clear();
        this.setState({ users: [] });
    }

    _render_list = () => {
        const { users } = this.state;

        if (users.length === 0) return (<div className="data-empty">Không có dữ liệu</div>)

        return (<Row>{users.map((user, index) => {

            const fullName = `${user.name.first} ${user.name.first}`;
            const fullAddress = `${user.location.street.number} ${user.location.street.name}`;
            const img = user.picture.large;

            return (<Col md={4} lg={3} className="mb-3" key={index}>
                <Card className="box-user">
                    <Card.Img variant="top" src={img} />
                    <Card.Body className="box-content">
                        <Card.Title>{fullName}</Card.Title>
                        <ListGroup>
                            <ListGroup.Item><i className="fas fa-phone-alt"></i>: {user.phone}</ListGroup.Item>
                            <ListGroup.Item><i className="fas fa-birthday-cake"></i>: {user.dob.date}</ListGroup.Item>
                            <ListGroup.Item><i className="far fa-envelope"></i>: {user.email}</ListGroup.Item>
                            <ListGroup.Item><i className="fas fa-map-marked-alt"></i>: {fullAddress}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>)
        })}</Row>)
    }

    render() {
        return (
            <div className="favorite-list">
                <h2 className="mb-3">Favorite List</h2>
                <Button className="mb-3" variant="danger" onClick={() => this.deleteAllUser()}>Delete All</Button>
                {this._render_list()}
            </div >
        );
    }
}

export default FavoriteList;