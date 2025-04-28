document.getElementById("form_checklist").addEventListener('submit', async (e) => {
    e.preventDefault();

    const conteudo = document.getElementById('conteudo').value;

    await fetch('http://localhost:3002/adicionarChecklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({conteudo})
    });

    document.getElementById('form_checklist').reset(); 
});