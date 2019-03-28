import React from "react"
import PropTypes from "prop-types"
import Product from "./Product";
class Products extends React.Component {
  render () {
    var products = this.props.products.map(product => {
      return (
        <div className="col-lg-3 col-md-6 mb-3" key={product.id}>
          <Product
            id={product.id}
            name={product.name}
            amount={product.amount}
            isAvailable={product.amount > 0 ? true : false}
            handleChange={this.props.handleChange}
          />
        </div>
      );
    });

    return (
      <div className="row">
        {products}
      </div>
      );
  }
}

export default Products
