document.getElementById("addHabito").addEventListener('submit', async (e) => {
    e.preventDefault();

    const habito = document.getElementById('habito').value;
    const periodo = document.getElementById('periodo').value;

    await fetch('http://localhost:3002/adicionarHabito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({habito, periodo})
    });

    document.getElementById('addHabito').reset(); 
});