// Carregar e exibir habitos

async function adicionarL() {
    let div = document.getElementById("form_lembretes");

    div.style.visibility = "visible"
}

async function loadLembretes() {
    try {
    const response = await fetch("http://localhost:3002/lembretes");
    const data = await response.json();
    let tbody = document.getElementById("lembretes");
    tbody.innerHTML = '';

    if (data.success && data.data) {
        data.data.forEach(lembrete => {
            const linha = document.createElement('ul');
            linha.classList.add('itemLembrete');
            linha.innerHTML = `
                    ${lembrete.dia} - ${lembrete.titulo}
                    <button onclick="deletarLembrete(${lembrete.id})">X</button>
                    <button onclick="editarLembrete(${lembrete.id})"><img style="width: 5%;" src="./assents/lapis.png" alt=""></button>
            `;
            tbody.appendChild(linha);
        });
    }
} catch (error) {
    console.error("Erro ao carregar lembretes", error);
};
}

// editar lembretes 

async function editarLembrete(id) {
    const titulo = prompt("Novo título");
    const dia = prompt("Nova data (AAAA-MM-DD)");


    await fetch(`http://localhost:3002/lembretes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({titulo, dia })
    });

    await loadLembretes();
}

// deletar lembrete

async function deletarLembrete(id) {
    await fetch(`http://localhost:3002/lembretes/${id}`, {
        method: 'DELETE'
    });
    await loadLembretes()
}

loadLembretes()