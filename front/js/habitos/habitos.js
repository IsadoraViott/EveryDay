// Carregar e exibir habitos

async function loadHabitos() {
    loadHabitosManha()
    loadHabitosTarde()
    loadHabitosNoite()
}

async function adicionar() {
    let div = document.getElementById("form_habitos");

    div.style.visibility = "visible"
}

async function loadHabitosManha() {
    try {
    const response = await fetch("http://localhost:3002/habitos/manha");
    const data = await response.json();
    let tbody = document.getElementById("habitosManha");
    tbody.innerHTML = '';

    if (data.success && data.data) {
        data.data.forEach(habito => {
            const linha = document.createElement('ul');
            linha.classList.add('itemHabito');
            linha.innerHTML = `
                    ${habito.habito}
                    <button onclick="deletarHabito(${habito.id})">X</button>
            `;
            tbody.appendChild(linha);
        });
    }
} catch (error) {
    console.error("Erro ao carregar hábitos", error);
};
}

async function loadHabitosTarde() {
    try {
    const response = await fetch("http://localhost:3002/habitos/tarde");
    const data = await response.json();
    let tbody = document.getElementById("habitosTarde");
    tbody.innerHTML = '';

    if (data.success && data.data) {
        data.data.forEach(habito => {
            const linha = document.createElement('ul');
            linha.classList.add('itemHabito');
            linha.innerHTML = `
                    ${habito.habito}
                    <button onclick="deletarHabito(${habito.id})">X</button>
            `;
            tbody.appendChild(linha);
        });
    }
} catch (error) {
    console.error("Erro ao carregar hábitos", error);
};
}

async function loadHabitosNoite() {
    try {
    const response = await fetch("http://localhost:3002/habitos/noite");
    const data = await response.json();
    let tbody = document.getElementById("habitosNoite");
    tbody.innerHTML = '';

    if (data.success && data.data) {
        data.data.forEach(habito => {
            const linha = document.createElement('ul');
            linha.classList.add('itemHabito');
            linha.innerHTML = `
                    ${habito.habito} 
                    <button onclick="deletarHabito(${habito.id})">X</button>
            `;
            tbody.appendChild(linha);
        });
    }
} catch (error) {
    console.error("Erro ao carregar hábitos", error);
};
}

async function deletarHabito(id) {
    await fetch(`http://localhost:3002/habitos/${id}`, {
        method: 'DELETE'
    });
    await loadHabitos()
}


loadHabitosManha()
loadHabitosTarde()
loadHabitosNoite()