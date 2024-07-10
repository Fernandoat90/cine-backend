document.getElementById('loguinForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const requestData = {
        dni: formData.get('dni'),
        pass: formData.get('pass')
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Error en la autenticación del usuario');
        }

        // Redireccionar a peliculas.html si la autenticación es exitosa
        window.location.href = '/peliculas';

    } catch(error) {
        console.error('Error:', error);
        alert('Usuario o Contraseña incorrecta/s .');
    }
});
