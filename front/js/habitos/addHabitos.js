async function adicionarHabito() {
    const habito = document.getElementById('habito').value;
    const periodo = document.getElementById('periodo').value;

    const data = {
        habito,
        periodo
    }

    try {
        const response = await fetch('http://localhost:3002/adicionarHabito', {
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
            window.location.assign('habitos.html')
        } else {
            alert(results.message)
        }
    }
    catch (error) {
        console.log(error);
    }
};

// loadHabitos();