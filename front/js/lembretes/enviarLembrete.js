document.getElementById("addLembrete").addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const dia = document.getElementById('dia').value;

    await fetch('http://localhost:3002/adicionarLembrete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({titulo, dia})
    });

    document.getElementById('addLembrete').reset(); 
});