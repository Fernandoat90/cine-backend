document.getElementById('compraEntradas').addEventListener('submit', async function(event) {
    event.preventDefault();
  
  
    const formData = new FormData(this);
    const requestData = {
      pelicula: formData.get('pelicula'),
      horario: formData.get('horario'),
      formato: formData.get('formato'),
      asiento: formData.get('asiento'),
      dni:formData.get('dni'),
      monto: formData.get('monto')
    };
  
    try {
      const response = await fetch('/altaCompra', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error('Error al registrar la compra');
      }
      
      alert('La compra se realizo con exito.');
      document.getElementById('registerForm').reset();
      
      
    } catch(error) {
      console.error('Error', error);
      alert('Hubo un error en la compra de entradas');
    }
  });