
export const Note = (props) => {

    const {title, body} = props
    return (
        <li>
            <p>{title}</p>
            {body}
        </li>)
}