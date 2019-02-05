import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchProduct} from "../actions/productActions";
import {Link} from "react-router-dom";
import ProductsRedactor from './additionalComponents/productsRedactor';
import AddProduct from './additionalComponents/addProduct';
import DeleteProducts from './additionalComponents/deleteProducts';


class ProductRequest extends Component {
    constructor(props) {
        super(props);
        this.handleShowProduct = this.handleShowProduct.bind(this);
        this.productShow = this.productShow.bind(this);
    }

    handleShowProduct(event) {
        this.props.dispatch(fetchProduct(event));
    }

    productShow(arrayProduct) {
        if (!arrayProduct) {
            return null;
        }
        const newArrayProduct = arrayProduct.map((product) => {
                const path = `/comment/${product._id}`;
                return (
                    <div
                        className="product-list"
                    >
                        <ul
                            className="list-group list-group-flush"
                        >
                            <Link
                                to={path}
                            >
                                <li
                                    className="list-group-item"
                                >
                                    <h4>{product.name}</h4>
                                </li>
                            </Link>
                            <DeleteProducts
                                id={product._id}
                            />
                        </ul>
                    </div>
                )
            }
        );

        return newArrayProduct
    }

    render() {
        const productList = this.productShow(this.props.products);
        return (
            <div
                align="center"
            >
                <div
                    className='registration-authorization'
                >
                    <p>
                        <p>
                            <div>
                            <Link
                                to="/registration"
                            >
                                <button
                                    className="btn btn-primary"
                                >
                                    Registration
                                </button>
                            </Link>
                            <Link
                                to="/authorization"
                            >
                                <button
                                    className="btn btn-primary"
                                >
                                    Authorization
                                </button>
                            </Link>
                            </div>
                        </p>
                    </p>
                </div>
                <div>
                    {productList}
                    <button
                        className="btn btn-primary"
                        onClick={this.handleShowProduct}
                    >
                        display a list of products
                    </button>
                </div>
                <div
                    className="addProduct"
                >
                    <AddProduct/>
                </div>
                <div
                    className="productsRedactor"
                >
                    <ProductsRedactor/>
                </div>
            </div>

        )
    }
}

function mapStateToProps(product) {
    return (
        product.product.categories
    )

}

export default connect(mapStateToProps)(ProductRequest);