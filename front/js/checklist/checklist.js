// carregar e exibir checklist

async function adicionarC() {
    let div = document.getElementById("form_checklist");

    div.style.visibility = "visible"
}

async function loadChecklist() {
    try {
    const response = await fetch("http://localhost:3002/checklist");
    const data = await response.json();
    let tbody = document.getElementById("conteudos");
    tbody.innerHTML = '';

    if (data.success && data.data) {
        data.data.forEach(checklist => {
            const linha = document.createElement('ul');
            linha.classList.add('itemChecklist');
            linha.innerHTML = `
                    
            <input type="checkbox" onclick="deletarChecklist(${checklist.id})">${checklist.conteudo}</input>
            `;
            tbody.appendChild(linha);
        });
    }
} catch (error) {
    console.error("Erro ao carregar checklist", error);
};
}

// deletar/concluir checklist

async function deletarChecklist(id) {
    await fetch(`http://localhost:3002/checklist/${id}`, {
        method: 'DELETE'
    });
    await loadChecklist()
}

loadChecklist()