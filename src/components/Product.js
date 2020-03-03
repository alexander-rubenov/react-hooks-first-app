import React, {useState, useContext} from 'react'
import {FirebaseContext} from '../context/firebase/firebaseContext'
import {AlertContext} from "../context/alert/alertContext"
import { Quantity } from './Quantity'

export const Product = ({onRemove, product}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(product.title)
  const [category, setCategory] = useState(product.category)
  const [weight, setWeight] = useState(product.weight)
  const [price, setPrice] = useState(product.price)
  const [quantity, setQuantity] = useState(product.quantity)
  const [article, setArticle] = useState(product.article)
  const [maker, setMaker] = useState(product.maker)

  const alert = useContext(AlertContext)
  const firebase = useContext(FirebaseContext)


  const submitHandler = event => {
    event.preventDefault()

    if (title.trim() && category && weight && price && quantity > 1 && article) {
        firebase.editProduct({
            id: product.id,
            title: title.trim(),
            category,
            weight,
            price,
            quantity,
            article,
            maker
        })
            .then(() => {
                alert.show('Товар был обновлен', 'success')
            })
            .catch(() => {
                alert.show('Что-то пошло не так', 'danger')
            })

            setIsEditing(false)
      } else {
          alert.show('Заполните все обязательные поля')
      }
  }

  return (
    <li className="list-group-item note">
        {isEditing ?
            (
                <div>
                    <form onSubmit={submitHandler}>
                        <div className="form-group products-list">
                            <label>
                              Название
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Название"
                                  value={title}
                                  onChange={event => setTitle(event.target.value)}
                                  required
                              />
                            </label>
                            <label>
                                Категория
                                <select
                                    className="form-control"
                                    value={category}
                                    onChange={event => setCategory(event.target.value)}
                                    required
                                >
                                    <option value="Мебель">Мебель</option>
                                    <option value="Техника">Техника</option>
                                    <option value="Книги">Книги</option>
                                    <option value="Телефоны">Телефоны</option>
                                </select>
                            </label>
                            <label>
                              Вес
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Вес"
                                  value={weight}
                                  onChange={event => setWeight(event.target.value)}
                                  required
                              />
                            </label>
                            <label>
                              Цена
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Цена"
                                  value={price}
                                  onChange={event => setPrice(event.target.value)}
                                  required
                              />
                            </label>
                            <label>
                              Кол-во
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Кол-во"
                                  value={quantity}
                                  onChange={event => setQuantity(event.target.value)}
                                  required
                              />
                            </label>
                            <label>
                              Производитель
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Производитель"
                                  value={maker}
                                  onChange={event => setMaker(event.target.value)}
                              />
                            </label>
                            <label>
                              Артикул
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Артикул"
                                  value={article}
                                  onChange={event => setArticle(event.target.value)}
                                  required
                              />
                            </label>

                            <input className="form-control btn btn-primary form-edit-submit" type="submit" value="Изменить" />
                            </div>
                    </form>
                </div>
            )
            :
            (
                <div className="products-list">
                    <div>{product.title}</div>
                    <div>{product.category}</div>
                    <div>{product.weight}</div>
                    <div>{product.price}</div>
                    <div>
                      <Quantity product={product} />
                    </div>
                </div>
            )
        }

    <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={() => onRemove(product.id)}
    >
        &times;
    </button>
    <button
        type="button"
        className="btn btn-outline-info btn-sm"
        onClick={() => setIsEditing(!isEditing)}
    >
        &#182;
    </button>
  </li>
  )
}
