import Button from "@/components/Button";
import Input from "@/components/Input";
import ListaLembretes from '@/components/ListaLembrete';
import React, { useState } from 'react';
import './App.css';

function App() {

    const [valorInput, setValorInput] = useState('');
    const [dataInput, setDataInput] = useState('');
    const [listaLembretes, setListaLembretes] = useState([]);
    const [key, setKey] = useState(0);

    let existe = false;

    function handleChangeValor(valor) {
        setValorInput(valor);
    }

    function handleChangeData(data) {
        setDataInput(data);
    }

    async function adicionarLembrete() {
        if (valorInput === "" || dataInput === "") {
            alert("Preencha todos os campos antes de criar uma tarefa!");
        } else {
            let novoLembrete = {
                name: valorInput,
                date: dataInput
            }

            try {
                const retorno = await verificarTarefa(novoLembrete)
                const tarefaIgual = retorno[0]
                const tarefaJaIncluida = retorno[1]
                console.log("Tarefa Igual:", tarefaIgual)

                if (!tarefaJaIncluida) {
                    if (tarefaIgual) {
                        let posicaoInsercao = listaLembretes.findIndex(elem => elem.date === novoLembrete.date)
                        if (posicaoInsercao === -1) { // caso nao ache a posicao, automaticamente vai para ultima posicao
                            posicaoInsercao = listaLembretes.length
                        }
                        posicaoInsercao++
                        novoLembrete.date = ""
                        const novaLista = [...listaLembretes.slice(0, posicaoInsercao), novoLembrete, ...listaLembretes.slice(posicaoInsercao)]
                        setListaLembretes(novaLista)
                    } else {
                        ordemCronologica(listaLembretes, novoLembrete)
                    }
                    const response = await fetch("https://localhost:44326/api/Tarefas", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(novoLembrete)
                    });
                    if (response.ok) {
                        alert("Tarefa adicionada com sucesso!");
                    }
                    console.log("Existe a tarefa:", tarefaJaIncluida);
                    clearInput();
                } else {
                    alert("Tarefa ja incluida no banco de dados!")
                }
            } catch (error) {
                alert("Erro gerado: " + error);
            }
        }
    }

    async function render() {
        try {
            const response = await fetch('https://localhost:44326/api/Tarefas', { method: "GET" });
            const dados = await response.json();
            console.log("Dados da API ->", dados);
            return dados;
        } catch (e) {
            alert(e);
            return [];
        }
    }

    function ordemCronologica(arrayLembretes, lembreteUnico) {
        console.log(`Lembrete Unico -> ${lembreteUnico.date}`)
        const dataNovoLembrete = removePadraoData(lembreteUnico.date)

        let inserido = false

        for (let i = 0; i < arrayLembretes.length; i++) {
            console.log(`Lembrete Unico -> ${arrayLembretes[i]}`)
            const dataAtual = removePadraoData(arrayLembretes[i].date)

            if (dataNovoLembrete < dataAtual) {
                arrayLembretes.splice(i, 0, lembreteUnico)
                inserido = true
                break
            }
        }

        if (!inserido) {
            arrayLembretes.push(lembreteUnico)
        }
    }

    async function verificarTarefa(lembrete) {
        let dataIgual = false
        let tarefaJaIncluida = false
        const dados = await render()
        console.log("Dados do bd:", dados)
        
        dados.forEach((elem, id) => {
            if (elem.date === lembrete.date && elem.name.trim() === lembrete.name.trim()) {
                tarefaJaIncluida = true
            } else if (elem.date === lembrete.date){
                dataIgual = true
            }
        })
        
        return [dataIgual, tarefaJaIncluida]
    }
    function removePadraoData(stringData) {
        return stringData.replaceAll('/', '')
    }

    function clearInput() {
        setValorInput('');
        setDataInput('');
        setKey(prevKey => prevKey + 1);
    }

    return (
        <header className="main-container">
            <div className="textLembrete">Novo Lembrete</div>
            <div className="form-body">
                <Input key={key + 'nome'} id="nome" nome="Nome" tipo="text" placeholder="Nome do Lembrete" value={valorInput} onChange={handleChangeValor} required />
                <Input key={key + 'data'} id="data" nome="Data" tipo="date" placeholder="dd-mm-yyyy" value={dataInput} onChange={handleChangeData} required />
                <Button onClick={adicionarLembrete} />
                <ListaLembretes lembretes={listaLembretes} setLembretes={setListaLembretes} />
            </div>
        </header>
    );
}

export default App;

