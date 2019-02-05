import React, { Component } from 'react';
import {Provider} from "react-redux";
import store from "./store";
import ProductRequest from "./components/productRequest";

class App extends Component {



    render() {

        return (
            <div>
                <Provider store={store}>
                    <ProductRequest/>
                </Provider>
            </div>
        );
    }
}

export default App;