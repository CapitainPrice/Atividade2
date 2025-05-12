const tarefas = [
    { id: 1, descricao: "Estudar para a prova", concluida: false },
    { id: 2, descricao: "Fazer um projeto de arte", concluida: false },
    { id: 3, descricao: "Comprar mantimentos", concluida: false },
    { id: 4, descricao: "Limpar o quarto", concluida: false },
    { id: 5, descricao: "Ler um livro", concluida: false },
    { id: 6, descricao: "Fazer exercícios", concluida: false },
];

const listaTarefas = document.getElementById("task-list");
const filtro = document.getElementById("filter");

function renderizarTarefas(filtroSelecionado) {
    listaTarefas.innerHTML = "";

    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtroSelecionado === "all") return true;
        if (filtroSelecionado === "completed") return tarefa.concluida;
        if (filtroSelecionado === "not-completed") return !tarefa.concluida;
    });

    tarefasFiltradas.forEach((tarefa) => {
        const li = document.createElement("li");
        li.textContent = tarefa.descricao;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener("change", () => {
            tarefa.concluida = checkbox.checked;
            renderizarTarefas(filtro.value);
        });

        li.prepend(checkbox);
        listaTarefas.appendChild(li);
    });
}

filtro.addEventListener("change", () => {
    renderizarTarefas(filtro.value);
});

renderizarTarefas("all");
