import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useTarefa = () => {

const [tarefa, setTarefa] = useState (
{

id: null,
titulo: "",
finalizada: false
}
)

const [listaTarefas, setListaTarefas] = useState (() => {

const listaTarefas_storage = localStorage.getItem ("listaTarefas")

return listaTarefas_storage?JSON.parse (listaTarefas_storage):[]
})

useEffect(() => {

localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas))

}, [listaTarefas])

const exibirMensagem = (color, msg) => {

const divMensagem = document.getElementById("divMensagem")
divMensagem.style.color = color
divMensagem.textContent = msg
}

const adicionar_tarefa = (titulo) => {

const novaTarefa = {

id: Math.random(),
titulo: titulo,
finalizada: false
}

const novaListaTarefas = [...listaTarefas, novaTarefa]
setListaTarefas(novaListaTarefas)
alert("Tarefa adicionada com sucesso!")
}

const excluir_tarefa = (id) => {

const novaListaTarefas = listaTarefas.filter(tarefa => tarefa.id !== id)

setListaTarefas(novaListaTarefas)

alert("Tarefa excluida com sucesso!")
}

const navigate = useNavigate()

const exibir_detalhes_tarefa = (id) => {
const tarefa = listaTarefas.find(tarefa => tarefa.id === id)
navigate("/tarefaDetalhes", {state:tarefa})
}

const alterar_tarefa = (tarefa_editada) => {
const novaListaTarefas = listaTarefas.map(tarefa => {

if (tarefa.id === tarefa_editada.id) {

return tarefa_editada

} else {

return tarefa
}
})

setListaTarefas(novaListaTarefas)

alert ("Tarefa alterada com sucesso!")
}

return ({

listaTarefas,
exibirMensagem,
adicionar_tarefa,
excluir_tarefa,
exibir_detalhes_tarefa,
alterar_tarefa
})
}

export default useTarefa