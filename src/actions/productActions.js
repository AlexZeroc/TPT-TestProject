import React from 'react';
import axios from 'axios';
import {PRODUCT_LOADED} from "../constans";

export const fetchProduct = () => {

    return function (dispatch) {
        axios.post('http://job.goodstudio.by/api/products/',
            {}
            )
            .then((response) => {
                const {data} = response;
                dispatch (
                    {
                    type: PRODUCT_LOADED,
                    payload: {data}
                })
            })
    }
};





