document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
  
    const formData = new FormData(this);
    const requestData = {
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      dni: formData.get('dni'),
      pass: formData.get('pass'),
      fec_nac: formData.get('fec_nac')
    };
  
    try {
      const response = await fetch('/sigin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }
      
      alert('El usuario fue registrado exitosamente.');
      document.getElementById('registerForm').reset();
      
      
    } catch(error) {
      console.error('Error', error);
      alert('Hubo un error en el registro del usuario');
    }
  });

  