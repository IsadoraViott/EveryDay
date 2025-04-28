async function adicionarChecklist() {

    const conteudo = document.getElementById('conteudo').value;

    const data = {
        conteudo
    }

    try {
        const response = await fetch('http://localhost:3002/adicionarChecklist', {
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
            window.location.assign('checklist.html')
        } else {
            alert(results.message)
        }
    }
    catch (error) {
        console.log(error);
    }
};

