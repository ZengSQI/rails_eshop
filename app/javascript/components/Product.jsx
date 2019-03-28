import React from "react"
import PropTypes from "prop-types"
class Product extends React.Component {
  
  componentDidUpdate(){
    var cbs = document.getElementsByClassName("form-check-input");
    Array.prototype.filter.call(cbs, function(cb) {
      cb.checked = false
    });
  }
  

  render () {
    return (
      <div className="card h-100">
        <img className="card-img-top" src="http://placehold.it/700x500" alt=""></img>
        <div className="card-body">
          <h4 className="card-title">
            <a href="#">{this.props.name}</a>
          </h4>
          <h5>$1.99</h5>
          <p className="card-text">庫存狀況：{this.props.isAvailable ? "有庫存":"已售完"}</p>
          <small className="text-muted">剩餘數量：{this.props.amount}</small>
        </div>
        <div className="card-footer">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id={this.props.id} disabled={!this.props.isAvailable} onClick={this.props.handleChange}></input>
            <label className="form-check-label" >加入訂單</label>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  amount: PropTypes.number,
  isAvailable: PropTypes.bool
};
export default Product
