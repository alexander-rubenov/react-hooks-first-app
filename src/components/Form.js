import React, {useState, useContext} from 'react'
import {AlertContext} from "../context/alert/alertContext"
import {FirebaseContext} from '../context/firebase/firebaseContext'

export const Form = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Мебель')
    const [weight, setWeight] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [article, setArticle] = useState('')
    const [maker, setMaker] = useState('')

    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)

    const submitHandler = event => {
        event.preventDefault()

        if (title.trim() && category && weight && price && quantity > 1 && article) {
            firebase.addProduct({
                title: title.trim(),
                category,
                weight,
                price,
                quantity,
                article,
                maker
            })
                .then(() => {
                    alert.show('Товар был добавлен', 'success');
                })
                .catch(() => {
                    alert.show('Что-то пошло не так', 'danger');
                })

            setTitle('')
            setCategory('Мебель')
            setWeight('')
            setPrice('')
            setQuantity('')
            setArticle('')
            setMaker('')
        } else {
            alert.show('Заполните все обязательные поля');
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Название"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    required
                />
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
                <input
                    type="text"
                    className="form-control"
                    placeholder="Вес, кг"
                    value={weight}
                    onChange={event => setWeight(event.target.value)}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Цена"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Кол-во"
                    value={quantity}
                    onChange={event => setQuantity(event.target.value)}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Производитель"
                    value={maker}
                    onChange={event => setMaker(event.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Артикул"
                    value={article}
                    onChange={event => setArticle(event.target.value)}
                    required
                />

                <input className="form-control btn btn-primary" type="submit" value="Добавить товар" />
            </div>
        </form>
    )
}
