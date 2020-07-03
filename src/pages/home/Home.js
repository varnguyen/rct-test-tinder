import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ReactSwing from 'react-swing';
import './Home.scss';
import { get_new_user_action } from '../../redux/actions';
import { isEmpty } from '../../helper/validate';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            view: {
                title: '',
                value: '',
                selected: 1
            },
            user_info: {},
            user_info_res: {},
            stack: null,
            config: {
                throwOutConfidence: (xOffset, yOffset, element) => {
                    const xConfidence = Math.abs(xOffset) / (element.offsetWidth / 1.7);
                    const yConfidence = Math.abs(yOffset) / (element.offsetHeight / 2);
                    return Math.min(Math.max(xConfidence, yConfidence), 1);
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.user_info_res && props.user_info_res.payload && !isEmpty(props.user_info_res.payload) && (props.user_info_res.payload !== state.user_info_res)) {
            return { user_info_res: props.user_info_res.payload }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        const { user_info_res } = this.state

        if (prevState.user_info_res !== user_info_res) {

            const user_info = user_info_res.data.results[0];
            const view = {
                title: 'Hi, My name is',
                value: `${user_info.name.first} ${user_info.name.first}`,
                selected: 1
            }
            this.setState({ user_info, view, isLoading: false });
        }
    }

    componentDidMount() {
        this.loadInit();
    }

    loadInit = () => {
        this.getNewUser();
    }

    getNewUser = () => {
        this.setState({ isLoading: true });
        this.props.get_new_user_action();
    }

    updateView = (view) => {
        this.setState({ view });
    }

    onThrowOut = (event) => {

        if (event.throwDirection.toString() === 'Symbol(RIGHT)') {
            this.likeUser();
        }

        if (event.throwDirection.toString() === 'Symbol(LEFT)') {
            this.nopeUser();
        }
    }

    nopeUser = () => {
        this.getNewUser();
    }

    likeUser = () => {
        const { user_info } = this.state;
        this.saveUser(user_info);
        this.getNewUser();
    }

    saveUser = (user_info) => {
        var users = localStorage.getItem('users');

        if (!users) {
            users = [];
        } else {
            users = JSON.parse(users);
        }

        users.unshift(user_info);
        localStorage.setItem('users', JSON.stringify(users));
    }

    renderLoading = () => {
        return (<div className="loading text-center"><img src="/assets/images/loading.gif" alt="loading" /></div>);
    }

    renderUserInfo = () => {

        const { config, user_info, view } = this.state;
        const fullName = `${user_info.name.first} ${user_info.name.first}`;
        const fullAddress = `${user_info.location.street.number} ${user_info.location.street.name}`;

        return (<React.Fragment>
            <ReactSwing
                className="stack"
                config={config}
                setStack={(stack) => this.setState({ stack })}
                ref={this.stackEl}
                throwout={(e) => this.onThrowOut(e)}
            >
                <div className="box">
                    <div className="box-detail">
                        <div className="box-detail__img">
                            <a href="#new_user" className="refresh" onClick={() => this.getNewUser()}>New</a>
                            <img src={user_info.picture.large} alt="avatar" />
                        </div>
                        <p className="box-detail__title">{view.title}</p>
                        <p className="box-detail__value">{view.value}</p>
                    </div>
                    <div className="box-action">
                        <ul className="values_list">
                            <li className={view.selected === 1 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "Hi, My name is", value: fullName, selected: 1 })}>
                                <i className="far fa-user"></i>
                            </li>
                            <li className={view.selected === 2 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My email address is", value: user_info.email, selected: 2 })}>
                                <i className="far fa-envelope"></i>
                            </li>
                            <li className={view.selected === 3 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My birthday is", value: user_info.dob.date, selected: 3 })}>
                                <i className="fas fa-birthday-cake"></i>
                            </li>
                            <li className={view.selected === 4 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My address is", value: fullAddress, selected: 4 })}>
                                <i className="fas fa-map-marked-alt"></i>
                            </li>
                            <li className={view.selected === 5 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My phone number is", value: user_info.phone, selected: 5 })}>
                                <i className="fas fa-phone-alt"></i>
                            </li >
                            <li className={view.selected === 6 ? 'active' : ''} onMouseEnter={() => this.updateView({ title: "My password is", value: user_info.login.password, selected: 6 })}>
                                <i className="fas fa-lock"></i>
                            </li >
                        </ul>
                    </div>
                </div>
            </ReactSwing>
            <div className="action mt-3 mb-5">
                <Button variant="danger" onClick={() => this.nopeUser()}>Nope</Button>
                <Button variant="success" onClick={() => this.likeUser()}>Like</Button>
            </div >
        </React.Fragment >);
    }

    render() {

        const { isLoading } = this.state;

        return (
            <div className="home">
                <h2 className="text-center mb-5 title">RANDOM USER GENERATOR</h2>

                {isLoading
                    ? this.renderLoading()
                    : this.renderUserInfo()
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_info_res: state.get_new_user_reducer,
    }
}

export default connect(mapStateToProps, {
    get_new_user_action,
})(Home)