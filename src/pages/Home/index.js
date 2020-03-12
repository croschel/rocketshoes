/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MdShoppingCart } from "react-icons/md";
import { formatPrice } from "../../util/format";
import api from "../../services/api";
import { ProductList } from "./styles";
import * as cartActions from "../../store/modules/cart/actions";

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get("products");
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }

  handleAddShoesToCart = product => {
    const { addToCart } = this.props;
    addToCart(product);
  };

  render() {
    const { products } = this.state;
    const { amountHome } = this.props;
    return (
      <ProductList>
        {products.map(product => (
          <li>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              onClick={() => this.handleAddShoesToCart(product)}
            >
              <div>
                <MdShoppingCart size={16} color="#FFF" />
                {amountHome[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
const mapStateToProps = state => ({
  amountHome: state.cart.reduce((amountHome, product) => {
    amountHome[product.id] = product.amount;
    return amountHome;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(cartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
