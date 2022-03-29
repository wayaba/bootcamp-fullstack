//exporto un modulo nombrado entonces donde lo tenga que usar tengo que poner -->> import {Note} from './sarasa/Note'
export const Note = (props) => {
    //desestructuro props
    const {content, date} = props
    return (
        <li>
            <p>{content}</p>
            <small>
                <time>{date}</time>
            </small>
        </li>)
}

//esta forma hace que cuando lo quiera usar haga -->> import CualquierNombre from './sarasa/Note'
//export default Note