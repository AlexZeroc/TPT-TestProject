import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";


class AuthorizationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            status: '',
            style: ''
        };
        this.handleSendUsername = this.handleSendUsername.bind(this);
        this.handleSendPassword = this.handleSendPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSendUsername(event) {
        this.setState({username: event.target.value});
    }

    handleSendPassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        const username = this.state.username;
        const password = this.state.password;
        axios
            .post(`http://job.goodstudio.by/api/users/`, {
                    "username": `${username}`,
                    "password": `${password}`,
                }
            )
            .then(response => {
                console.log(response, 'responseegistration');
                if (response.data.status === 'failed') {
                    this.setState({status: 'error', username: '', password: '', name: '', style:'winnerFailed'});

                } else if (response.data.status === "ok") {
                    this.setState({status: 'You are successfully logged in!', username: '', password: '', name: '', style:'winnerOk'});

                }
            });


    }


    render() {
        return (
            <div>
                <div
                    align="center"
                >
                    <form>
                        <div
                            className="form-group"
                        >
                        <p>
                            username:
                            <label>
                                <input
                                    className="form-control"
                                    onChange={this.handleSendUsername}
                                    value={this.state.username}
                                    type='text'
                                />
                            </label>
                        </p>

                        <p>
                            password:
                            <label>
                                <input
                                    className="form-control"
                                    onChange={this.handleSendPassword}
                                    value={this.state.password}
                                    type='text'
                                />
                            </label>
                        </p>

                        <button
                            className="form-text text-muted"
                            type='button'
                            onClick={this.handleSubmit}
                        >
                            authorization
                        </button>
                        </div>
                    </form>
                </div>
                <div
                    className={this.state.style}
                >
                    <p
                        className="font-weight-bold">
                        <b>
                            {this.state.status}
                        </b>
                    </p>
                </div>
                <div>
                    <Link
                        to='/'
                    >
                        <button>
                            ---return to product page
                        </button>
                    </Link>
                </div>
            </div>
        )
    }


}

export default AuthorizationRequest;

