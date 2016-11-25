import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ProductRow = ({ data }) =>
    <div>
        <p><Link to="/evento">{data.name}, {data.city}. {data.distance} km</Link></p>
    </div>;

ProductRow.propTypes = {
    data: PropTypes.object
};

export default ProductRow;
