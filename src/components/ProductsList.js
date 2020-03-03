import React, {useContext, useState} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { Product } from './Product'
import {FirebaseContext} from '../context/firebase/firebaseContext'

export const ProductsList = ({products, filteredProducts, onRemove}) => {
    const [sortByPriceOrder, setSortByPriceOrder] = useState('ascending')
    const [sortByQuantityOrder, setSortByQuantityOrder] = useState('ascending')
    const [currentFilterByCategory, setCurrentFilterByCategory]= useState('Категория')
    const firebase = useContext(FirebaseContext)

    const sortByPrice = () => {
        firebase.sortByPrice(sortByPriceOrder)

        if (sortByPriceOrder === 'ascending') {
            setSortByPriceOrder('descending')
        } else if (sortByPriceOrder === 'descending') {
            setSortByPriceOrder('ascending')
        }
    }

    const sortByQuantity = () => {
        firebase.sortByPrice(sortByQuantityOrder)

        if (sortByQuantityOrder === 'ascending') {
            setSortByQuantityOrder('descending')
        } else if (sortByQuantityOrder === 'descending') {
            setSortByQuantityOrder('ascending')
        }
    }

    const filterByCategory = (targetCategory) => {
        setCurrentFilterByCategory(targetCategory)

        firebase.filterByCategory(targetCategory)
    }

    if (currentFilterByCategory !== 'Категория') products = filteredProducts

    return (
        <div>
            <ul className="nav nav-tabs products-list">
                <li className="nav-item products-list__item">
                    <button className="nav-link">
                        Название
                    </button>
                </li>
                <li className="nav-item products-list__item">
                    <select
                        className="form-control nav-link"
                        value={currentFilterByCategory}
                        onChange={event => filterByCategory(event.target.value)}
                        required
                    >
                        <option value="Категория">Категория</option>
                        <option value="Мебель">Мебель</option>
                        <option value="Техника">Техника</option>
                        <option value="Книги">Книги</option>
                        <option value="Телефоны">Телефоны</option>
                    </select>
                </li>
                <li className="nav-item products-list__item">
                    <button className="nav-link">
                        Вес
                    </button>
                </li>
                <li className="nav-item products-list__item">
                    <button className="nav-link" onClick={() => sortByPrice()}>
                        Цена
                    </button>
                </li>
                <li className="nav-item products-list__item">
                    <button className="nav-link" onClick={() => sortByQuantity()}>
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