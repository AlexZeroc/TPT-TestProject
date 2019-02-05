import React, {Component} from 'react';
import axios from 'axios';
import '../styleComponent/additionalComponentStyle.css'

let productList = '';

class ProductsRedactor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: false,
            name: '',
            category: '',
            picture: '',
            categories: false,
            status: '',
            newName: '',
            style:''

        };

        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleSendCategory = this.handleSendCategory.bind(this);
        this.handleSendPicture = this.handleSendPicture.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSendPicture = this.handleSendPicture.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleSendName = this.handleSendName.bind(this);
        this.handleSendNewName = this.handleSendNewName.bind(this);


    }

    componentDidMount() {
        axios.post('http://job.goodstudio.by/api/products/',
            {}
            )
            .then(response => {
                this.setState({products: response.data.products})
            });
        axios.get('http://job.goodstudio.by/api/categories/')
            .then(response => {
                    this.setState({categories: response.data.categories})
                }
            );
    }

    componentDidUpdate() {
        if (this.state.products === false) {
            return (
                'error'
            );
        } else if (this.state.products) {
            const voidArrayProduct = [];
            const products = this.state.products;
            products.forEach(function (element) {
                voidArrayProduct.push(element)
            });
            const productListRedactor = voidArrayProduct.map(product => {
                    return <option
                        value={product._id}
                        id={product.name}
                    >
                        {product.name}
                    </option>
                }
            );
            productList = productListRedactor;
        }
        if (this.state.categories === false) {
            return (
                'error'
            );
        } else if (this.state.categories) {
            const voidArray = [];
            const categories = this.state.categories;
            categories.forEach(function (element) {
                voidArray.push(element)
                }
            );
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

    handleSendName(event) {
        this.setState({name: event.target.value});
    }

    handleSendNewName(event) {
        this.setState({newName: event.target.value});
    }

    handleSendCategory(event) {
        this.setState({category: event.target.value});
    }

    handleSendPicture(event) {
        this.setState({picture: event.target.value});
    }


    handleAddProduct(event) {
        const name = this.state.newName;
        const category = this.state.category;
        const picture = this.state.picture;
        const id = this.state.name;
        axios
            .post
            (`http://job.goodstudio.by/api/products/${id}`,
                {
                    "name": `${name}`,
                    "category": `${category}`,
                    "picture": `${picture}`
                },
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
            .then
            (response => {
                    if (response.data.status === 'failed') {
                        this.setState({status: 'error',  newName: '', picture: '', style:'winnerFailed'});

                    } else if (response.data.status) {
                        this.setState({status: 'editing was successful!', newName: '', picture: '', style:'winnerOk'});

                    }
                }
            )


            .catch(() => {
            });
        event.preventDefault();


    }


    render() {
        const categoryList = this.componentDidUpdate();

        return (

            <div>
                <div>
                    <p>
                        <p>
                            <form className="form-search">
                                <div
                                    className="form-group"
                                >
                                <p>
                                    name:
                                <select
                                    className="btn btn-mini"
                                    onChange={this.handleSendName}
                                >
                                    <option
                                        value='product name'
                                    >name
                                    </option>
                                    {productList}
                                </select>
                                </p>
                                <p>
                                newName:
                                <label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={this.handleSendNewName}
                                        value={this.state.newName}
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
                                        product editing
                                    </button>
                                </p>
                                </div>
                            </form>
                        </p>
                    </p>
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
            </div>
        )
    }

}


export default ProductsRedactor;