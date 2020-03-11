/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import {formatPrice} from '../../util/format';
import api from '../../services/api';
import { ProductList } from './styles';

export default class Home extends Component {
    state = {
        products: [],
    };

    async componentDidMount() {
        const response = await api.get('products');
        const data = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price),
        }))
        this.setState({ products: data });
    }

    render() {
        const { products } = this.state;
        return (
            <ProductList>
                {products.map(produto => (
                    <li>
                        <img src={produto.image} alt={produto.title} />
                        <strong>{produto.title}</strong>
                        <span>{produto.priceFormatted}</span>
                        <button type="button">
                            <div>
                                <MdShoppingCart size={16} color="#FFF" />
                            </div>
                            <span>ADICIONAR AO CARRINHO</span>
                        </button>
                    </li>
                ))}
            </ProductList>
        );
    }
}
