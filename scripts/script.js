const tarefas = [
    { id: 1, descricao: "Estudar para a prova", concluida: false },
    { id: 2, descricao: "Fazer um projeto de arte", concluida: false },
    { id: 3, descricao: "Comprar mantimentos", concluida: false },
    { id: 4, descricao: "Limpar o quarto", concluida: false },
    { id: 5, descricao: "Ler um livro", concluida: false },
    { id: 6, descricao: "Fazer exercícios", concluida: false }
  ];

  const listaTarefas = document.getElementById("task-list");
  const filtro = document.getElementById("filter");
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const videoContainer = document.getElementById("video-container");

  function renderizarTarefas(filtroSelecionado) {
    listaTarefas.innerHTML = "";

    const tarefasFiltradas = tarefas.filter(tarefa => {
      if (filtroSelecionado === "all") return true;
      if (filtroSelecionado === "completed") return tarefa.concluida;
      if (filtroSelecionado === "not-completed") return !tarefa.concluida;
    });

    tarefasFiltradas.forEach(tarefa => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = tarefa.concluida;
      checkbox.addEventListener("change", () => {
        tarefa.concluida = checkbox.checked;
        renderizarTarefas(filtro.value);
      });

      li.prepend(checkbox);
      li.append(tarefa.descricao);
      listaTarefas.appendChild(li);
    });
  }

  filtro.addEventListener("change", () => {
    renderizarTarefas(filtro.value);
  });

listaTarefas.addEventListener("click", event => {
    if (event.target.classList.contains("delete-button")) {
        const tarefaId = parseInt(event.target.dataset.id, 10);
        const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
        if (tarefaIndex !== -1) {
            tarefas.splice(tarefaIndex, 1);
            renderizarTarefas(filtro.value);
        }
    }
});

function renderizarTarefas(filtroSelecionado) {
    listaTarefas.innerHTML = "";

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroSelecionado === "all") return true;
        if (filtroSelecionado === "completed") return tarefa.concluida;
        if (filtroSelecionado === "not-completed") return !tarefa.concluida;
    });

    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener("change", () => {
            tarefa.concluida = checkbox.checked;
            renderizarTarefas(filtro.value);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.dataset.id = tarefa.id;

        li.prepend(checkbox);
        li.append(tarefa.descricao);
        li.append(deleteButton);
        listaTarefas.appendChild(li);
    });
}

  form.addEventListener("submit", event => {
    event.preventDefault();

    const descricao = input.value.trim();
    if (!descricao) return;

    const novaTarefa = {
      id: tarefas.length + 1,
      descricao,
      concluida: false
    };
    tarefas.push(novaTarefa);
    input.value = "";
    renderizarTarefas(filtro.value);
  });

  document.addEventListener("keydown", event => {
    if (event.code === "Space") {
      event.preventDefault();
      if (videoContainer.style.display === "none") {
        videoContainer.style.display = "block";
      } else {
        videoContainer.style.display = "none";
      }
    }
  });

  renderizarTarefas("all");
