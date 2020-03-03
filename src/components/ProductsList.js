import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { Product } from './Product'

export const ProductsList = ({products, onRemove}) => {

    return (
        <div>
            <ul className="nav nav-tabs products-list">
                <li className="nav-item products-list__item">
                    <button className="nav-link">
                        Название
                    </button>
                </li>
                <li className="nav-item products-list__item">
                    <button className="nav-link">
                        Категория
                    </button>
                </li>
                <li className="nav-item products-list__item">
                    <button className="nav-link">
                        Вес
                    </button>
                </li>
                <li className="nav-item products-list__item">
                    <button className="nav-link">
                        Цена
                    </button>
                </li>
                <li className="nav-item products-list__item">
                    <button className="nav-link">
                        Кол-во на складе
                    </button>
                </li>
            </ul>

            <TransitionGroup component="ul" className="list-group">
                { products.map(product => (
                    <CSSTransition
                        key={ product.id }
                        classNames={'note'}
                        timeout={800}
                    >
                        <Product onRemove={onRemove} product={product} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )

}