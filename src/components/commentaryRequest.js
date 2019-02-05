import axios from 'axios';
import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CommentaryRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: false,
            comment: '',
            status: '',
            style: ''

        };

        this.handleSendComment = this.handleSendComment.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);


    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://job.goodstudio.by/api/products/${id}`)
            .then(response => {
                this.setState({product: response.data.product})
            });

    }

    componentDidUpdate() {
        if (this.state.product === false) {
            return <div>

            </div>;
        } else if (this.state.product) {
            console.log(this.state.product, 'product');
            const product = this.state.product;
            const {comments} = product;


            return (
                <div>
                    <div>
                        <p>
                            <h2>
                                {product.name}
                            </h2>
                        </p>
                    </div>
                    <div className="comment-list"
                    >
                        <ul
                            className="list-group"
                        >
                            {comments.map(c =>
                                <li
                                    className="list-group-item"
                                >
                                    <p>
                                        {c.text}
                                    </p>
                                    <button
                                        onClick={this.handleClickDelete}
                                        name={product._id}
                                        type="button"
                                        value={c.date}>
                                        delete comment
                                    </button>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            )

        }

    }

    handleSendComment(event) {
        this.setState({comment: event.target.value});

    }

    handleAddComment(event) {
        const comment = this.state.comment;
        const id = this.props.match.params.id;
        axios
            .put(`http://job.goodstudio.by/api/products/comment/${id}`,
                {
                    "text": `${comment}`
                }
            )
            .then(response => {
                if (response.data.status === 'failed') {
                    this.setState({status: 'error', comment: '', style:'winnerFailed'})

                } else if (response.data.status === 'ok') {
                    this.setState({status: 'Your comment has been successfully added!', comment: '', style:'winnerOk'})
                }
            })
            .catch(() => {
            });
        event.preventDefault();
    }

    handleClickDelete(a) {
        const id = a.target.name;
        const date = a.target.value;
        axios.delete(`http://job.goodstudio.by/api/products/comment/${id}`,
            {
            params: {
                "date": `${date}`
            }
        })
            .then(function (response) {
            })

    }

    render() {
        const commentRender = this.componentDidUpdate();
        return (
            <div
                align="center"
            >
                <div>
                    {commentRender}
                </div>
                <div>
                    <form>
                        <p>
                        <label>
                            <textarea
                                onChange={this.handleSendComment}
                                value={this.state.comment}
                            >
                            </textarea>
                        </label>
                        </p>

                        <button
                            type='button'
                            onClick={this.handleAddComment}
                        >
                            add a comment
                        </button>
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

export default CommentaryRequest;