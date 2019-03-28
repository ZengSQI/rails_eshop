import React, { useState } from "react"
import PropTypes from "prop-types"
import ProductsContainer from "./ProductsContainer";
class Main extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }

    this.selected = [];
    this.name = '';
    this.email = '';
    this.addr = '';


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(
      '/api/v1/products'
    )
      .then(res => res.json())
      .then(data => {
        this.setState({products: data})
      })
      .catch(e => console.log('ERROR:', e))
  }

  handleChange(event) {
    var id = parseInt(event.target.id);
    this.selected.indexOf(id) == -1 ? this.selected.push(id) : this.selected.pop(id);
  }

  handleSubmit(event){
    event.preventDefault();
    var form = document.getElementById('needs-validation');
    if (form.checkValidity() === false) {
      event.stopPropagation();
      form.classList.add('was-validated');
    }else{
      if(this.selected.length == 0){
        alert('請選擇商品');
      }else{
        let body = JSON.stringify({
          selected: this.selected,
          name: this.name.value,
          email: this.email.value,
          addr: this.addr.value
        });
        fetch("/api/v1/order", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: body
        })
        .then(response => {
          return response.json();
        })
        .then(el => {
          console.log(el.status);
          switch (el.status) {
            case 1:
              alert('購買成功！')
              break;
            case 0:
              alert('未知的商品')
              break;
            case -1:
              alert('部分商品已完售，請重新確認訂單！')
              break;
            default:
              break;
          }
          this.setState({products: el.products})
        });
      }
    }
  }
  

  render () {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">Rails EShop</span>
        </nav>
        <div className="container">
            <ProductsContainer
              products={this.state.products}
              handleChange={this.handleChange}
            />
            <form onSubmit={this.handleSubmit} id="needs-validation" noValidate className="mb-4">
            <div className="form-group">
              <label>Name</label>
              <input 
                ref={input => (this.name = input)}
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Enter your name" 
                required
                />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                ref={input => (this.email = input)}
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Enter email" 
                required
                />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input 
                ref={input => (this.addr = input)}
                type="text" 
                className="form-control" 
                id="address" 
                placeholder="Enter address" 
                required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Main
