/* eslint-disable react/prop-types */
import '../styles/Button.css'
export default function Button(props) {
    return (
        <div className="buttonArea">
            <button type="submit" className="button" onClick={props.onClick}>
                Criar
            </button>
        </div>
    )
}