import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { formatPrice } from "../../util/format";
import api from "../../services/api";
import { ProductList } from "./styles";
import * as cartActions from "../../store/modules/cart/actions";

export default function Home() {
  const [products, setProduct] = useState([]);
  const dispatch = useDispatch();

  const amountHome = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("products");
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProduct(data);
    }
    loadProducts();
  }, []);

  function handleAddShoesToCart(id) {
    dispatch(cartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map(product => (
        <li>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            onClick={() => handleAddShoesToCart(product.id)}
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
