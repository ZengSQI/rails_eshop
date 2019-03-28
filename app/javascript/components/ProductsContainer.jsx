import React from "react"
import PropTypes from "prop-types"
import Products from "./Products";
class ProductsContainer extends React.Component {
  
  constructor(props){
    super(props)
  }

  render () {
    return (
      <div className="Products-container my-4">
        <Products
          products={this.props.products}
          handleChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default ProductsContainer
