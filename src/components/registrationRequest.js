import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './styleComponent/componentStyle.css'

class RegistrationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            status: '',
            style:''
        };

        this.handleSendUsername = this.handleSendUsername.bind(this);
        this.handleSendPassword = this.handleSendPassword.bind(this);
        this.handleSendName = this.handleSendName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSendUsername(event) {
        this.setState({username: event.target.value});
    }

    handleSendPassword(event) {
        this.setState({password: event.target.value});
    }

    handleSendName(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit() {
        const username = this.state.username;
        const password = this.state.password;
        const name = this.state.name;
        axios
            .put(`http://job.goodstudio.by/api/users/`,
                {
                    "username": `${username}`,
                    "password": `${password}`,
                    "name": `${name}`
                }
            )
            .then(response => {
                if (response.data.status === 'failed') {
                    this.setState({status: 'error', username: '', password: '', name: '', style:'winnerFailed'});

                } else if (response.data.status === "ok") {
                    this.setState({status: 'Thank you for registering!', username: '', password: '', name: '', style:'winnerOk'});

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

                        <p>
                            name:
                            <label>
                                <input
                                    className="form-control"
                                    onChange={this.handleSendName}
                                    value={this.state.name}
                                    type='text'
                                />
                            </label>
                        </p>
                        <button
                            className="form-text text-muted"
                            type='button'
                            onClick={this.handleSubmit}
                        >
                            to register
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


export default RegistrationRequest;