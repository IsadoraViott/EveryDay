async function adicionarLembrete() {
    const titulo = document.getElementById('titulo').value;
    const dia = document.getElementById('dia').value;

    const data = {
        titulo,
        dia
    }

    try {
        const response = await fetch('http://localhost:3002/adicionarLembrete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })


        const results = await response.json();


        if (results.success) {
            console.log(results)
            alert(results.message)
            window.location.assign('lembretes.html')
        } else {
            alert(results.message)
        }
    }
    catch (error) {
        console.log(error);
    }
};

// loadHabitos();