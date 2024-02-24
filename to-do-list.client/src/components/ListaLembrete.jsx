"use client"
import '../styles/ListaLembrete.css'
export default function mostrarListaLembretes(props) {
    let lembretes = props.lembretes || []
    
    async function removerLembrete(i, lem) {
        try {
            let indiceCorretoBD = -1;
            const reqGet = await fetch('https://localhost:44326/api/Tarefas', { method: "GET" })
            const dadosBD = await reqGet.json()
            console.log("Dados do GET:", dadosBD)
            console.log("Dados do Item:", lem)
            dadosBD.forEach(elem => {
                if (elem.name === lem.name) {
                    indiceCorretoBD = elem.id
                }
            })
            if (indiceCorretoBD !== -1) {
                await fetch(`https://localhost:44326/api/Tarefas/${indiceCorretoBD}`, { method: "delete" })
                const novosLembretes = [...lembretes.slice(0, i), ...lembretes.slice(i + 1)]
                props.setLembretes(novosLembretes)
                console.log("Removendo... -> ", i + 1)
                alert("Deletado com sucesso!")
            } else {
                alert("Tarefa nao foi encontrada no banco de dados.")
            }
        } catch (e) {
            alert("Erro ao remover lembrete: " + e)
        }
        
    }

    return (
        <main className="mainTask">
            <span><b>Lista de Lembretes</b></span>
            <div className="taskBox">
                {lembretes.map((lem, i) => (
                    <div key={i} className='task' id={i}>
                        <p className='taskDate'>{lem.date}</p>
                        <span className='taskName'>
                            {lem.name}
                            <button className='buttonRemoveTask' onClick={() => removerLembrete(i, lem)}><span className="X">X</span></button>
                        </span>
                    </div>
                ))}
            </div>
        </main>
    )
}