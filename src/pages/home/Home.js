import React, { Component } from 'react';
import './Home.scss';
import ReactSwing from 'react-swing';
import get_new_user from './../../api/get_new_user';
import Direction from 'react-swing';
// import Swing from 'react-swing';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            view: {
                title: '',
                value: '',
                selected: 1
            },
            user: {},
            stack: null,
            config: {
                throwOutConfidence: (xOffset, yOffset, element) => {
                    const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
                    const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);
                    console.log(xConfidence, yConfidence, Math.max(xConfidence, yConfidence))
                    return Math.max(xConfidence, yConfidence / 2);
                }
            }
        }
    }

    componentDidMount() {
        this.getNewUser();

    }

    getNewUser() {
        this.setState({ loading: true });
        get_new_user()
            .then((res) => {
                const user = res.data.results[0];
                const view = {
                    title: 'Hi, My name is',
                    value: `${user.name.first} ${user.name.first}`,
                    selected: 1
                }
                this.setState({ user, view, loading: false });
            })
            .catch((error) => console.log(error));
    }

    updateView(view) {
        this.setState({ view });
    }

    throwCard() {
        // ReactSwing Card Directions
        console.log('ReactSwing.DIRECTION', ReactSwing.DIRECTION);

        console.log('this.state.stack', this.state.stack);
        console.log('this.state.stack.getConfig', this.state.stack.getConfig());
        console.log('this.stackEl', this.stackEl);

        // ReactSwing Component Childrens
        const targetEl = this.stackEl.current.childElements[1];
        console.log('targetEl', targetEl);

        if (targetEl && targetEl.current) {
            // stack.getCard
            const card = this.state.stack.getCard(targetEl.current);

            console.log('card', card);

            // throwOut method call
            card.throwOut(800, 800, ReactSwing.DIRECTION.RIGHT);
        }
    }

    onThrowOut(event) {
        // this.throwCard();

        console.log(event)


        if (event.throwDirection.toString() === 'Symbol(RIGHT)') {
            this.likeUser();
        }

        if (event.throwDirection.toString() === 'Symbol(LEFT)') {
            this.nopeUser();
        }
    }

    nopeUser() {
        this.getNewUser();
    }

    likeUser() {
        const { user } = this.state;
        this.saveUser(user);
        this.getNewUser();
    }

    saveUser(user) {
        var users = localStorage.getItem('users');

        if (!users) {
            users = [];
        } else {
            users = JSON.parse(users);
        }

        users.unshift(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    _render_loading() {
        return (<div className="loading text-center"><img src="/assets/images/loading.gif" alt="loading" /></div>);
    }

    _render_user_info() {

        const { user, view } = this.state;
        const fullName = `${user.name.first} ${user.name.first}`;
        const fullAddress = `${user.location.street.number} ${user.location.street.name}`;

        return (<div className="box">
            <div className="box-detail">
                <div className="box-detail__img">
                    <a href="#new_user" className="refresh" onClick={() => this.getNewUser()}>New</a>
                    <img src={user.picture.large} alt="avatar" />
                </div>
                <p className="box-detail__title">{view.title}</p>
                <p className="box-detail__value">{view.value}</p>
            </div>
            <div className="box-action">
                <ul className="values_list">
                    <li className={view.selected === 1 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "Hi, My name is", value: fullName, selected: 1 })}>
                        <i className="far fa-user"></i>
                    </li>
                    <li className={view.selected === 2 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My email address is", value: user.email, selected: 2 })}>
                        <i className="far fa-envelope"></i>
                    </li>
                    <li className={view.selected === 3 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My birthday is", value: user.dob.date, selected: 3 })}>
                        <i className="fas fa-birthday-cake"></i>
                    </li>
                    <li className={view.selected === 4 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My address is", value: fullAddress, selected: 4 })}>
                        <i className="fas fa-map-marked-alt"></i>
                    </li>
                    <li className={view.selected === 5 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My phone number is", value: user.phone, selected: 5 })}>
                        <i className="fas fa-phone-alt"></i>
                    </li >
                    <li className={view.selected === 6 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My password is", value: user.login.password, selected: 6 })}>
                        <i className="fas fa-lock"></i>
                    </li >
                </ul>
            </div>
        </div>);
    }

    render() {

        const { loading, config } = this.state;



        return (
            <div className="home">
                <h2 className="text-center mb-5 title">RANDOM USER GENERATOR</h2>

                {loading
                    ? this._render_loading()
                    : (<ReactSwing
                        className="stack"
                        // tagName="div"
                        config={config}
                        setStack={(stack) => this.setState({ stack })}
                        ref={this.stackEl}
                        throwout={(e) => this.onThrowOut(e)}
                    >
                        {this._render_user_info()}
                    </ReactSwing>)
                }

            </div>
        );
    }
}

export default Home;