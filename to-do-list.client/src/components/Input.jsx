/* eslint-disable react/prop-types */
import '../styles/Input.css'
export default function Input(props) {
    const date = new Date()
    const ano = date.getFullYear()
    let mes = date.getMonth() + 1
    let dia = date.getDate()
    let dataMinima = ''
    mes < 10 ? mes = `0${mes}` : mes
    dia < 10 ? dia = `0${dia}` : dia

    dataMinima = `${ano}-${mes}-${dia}`
   
    console.log(`Dia: ${dia}, Mes: ${mes}, Ano: ${ano}`)

    function handleChange(event) {
        const retorno = event.target.value
        console.log("data retorno:", retorno)
        if (event.target.id == 'date') {
            const dataFormatada = formatarData(retorno)
            console.log("data formatada:", dataFormatada)
            props.onChange(dataFormatada)
        } else {
            props.onChange(retorno)
        }
    }

    function formatarData(data) {
        const year = data.slice(0, 4)
        const month = data.slice(5, 7)
        const day = data.slice(8, 10)
        const dataFormatada = `${day}/${month}/${year}`
        return dataFormatada
    }

    return (
        <form className="formArea">
            <p className="nameText">{props.nome}</p>
            <input className="inputText" type={props.tipo} id={props.tipo} placeholder={props.placeholder} min={dataMinima} onChange={handleChange} />
        </form>
    );
}