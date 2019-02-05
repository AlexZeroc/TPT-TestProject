import React from 'react';
import axios from 'axios';


const DeleteProducts = ({id}) => {
    const handleClickDelete = (event) => {
        const id = event.target.name;
        axios.delete(`http://job.goodstudio.by/api/products/${id}`,
            {
            headers: {'Content-Type': 'application/json'}
        }
        )
            .then(function (response) {
            })
    };

    return (
        <button
            className="btn btn-mini"
            onClick={handleClickDelete}
            name={id}
            type="button"
        >
            delete product
        </button>
    )

};

export default DeleteProducts
