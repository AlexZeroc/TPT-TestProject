import React, {Component} from 'react';
import axios from 'axios';
import '../styleComponent/additionalComponentStyle.css'



class AddProduct extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            picture: '',
            categories: false,
            status: '',
            statusSend: '',
            style:''
        };
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleSendName = this.handleSendName.bind(this);
        this.handleSendCategory = this.handleSendCategory.bind(this);
        this.handleSendPicture = this.handleSendPicture.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSendPicture = this.handleSendPicture.bind(this);
    };


    componentDidMount() {
        axios.get('http://job.goodstudio.by/api/categories/')
            .then(response => {
                    this.setState({categories: response.data.categories})
                }
            );
    }

    componentDidUpdate() {
        if (this.state.categories === false) {
            return (
                'error'
            );
        } else if (this.state.categories) {
            const voidArray = [];
            const categories = this.state.categories;
            categories.forEach(function (element) {
                voidArray.push(element)
            });
            const categoryList = voidArray.map(category => {
                    return <option
                        value={category._id}
                    >
                        {category.name}
                    </option>
                }
            );

            return categoryList
        }
    }

    handleSendCategory(event) {
        this.setState({category: event.target.value});
    }

    handleSendName(event) {
        this.setState({name: event.target.value});
    }

    handleSendPicture(event) {
        this.setState({picture: event.target.value});
    }
    handleAddProduct(event) {
        const name = this.state.name;
        const category = this.state.category;
        const picture = this.state.picture;
        axios
            .put(`http://job.goodstudio.by/api/products/`, {
                    "name": `${name}`,
                    "category": `${category}`,
                    "picture": `${picture}`
                },
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
            .then(response => {
                if (response.data.status === 'failed') {
                    this.setState({statusSend: 'error', name: '', picture: '', style:'winnerFailed'});

                } else if (response.data.status) {
                    this.setState({statusSend: 'product added', name: '', picture: '', style:'winnerOk'});

                }
            })


            .catch(() => {
            });
        event.preventDefault();
    }

    render()
    {
        const categoryList = this.componentDidUpdate();

        return(
            <div>
                <p>
                    <p>
                        <form>
                            <div
                                className="form-group"
                            >
                            <p>
                            name:
                            <label>
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={this.handleSendName}
                                    value={this.state.name}
                                />
                            </label>
                            </p>
                            <p>
                            category:
                            <select
                                className="btn btn-mini"
                                onChange={this.handleSendCategory}
                            >
                                <option
                                    value='categories'
                                >categories
                                </option>
                                {categoryList}
                            </select>
                            </p>
                            <p>
                            picture:
                            <label>
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={this.handleSendPicture}
                                    value={this.state.picture}
                                />
                            </label>
                            </p>
                            <p>
                                <button
                                    className="form-text text-muted"
                                    type='button'
                                    value={this.state.name}
                                    onClick={this.handleAddProduct}
                                >
                                    add product
                                </button>
                            </p>
                            </div>
                        </form>
                    </p>
                </p>
                <div
                    className={this.state.style}
                >
                    <p
                        className="font-weight-bold">
                        <b>
                            {this.state.statusSend}
                        </b>
                    </p>
                </div>
            </div>
        )

    }
    }
export default AddProduct;