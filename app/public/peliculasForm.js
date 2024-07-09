//carga de select peliculas
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/pelis/todas');
        const peliculas = await response.json();
        
        const peliculaSelect = document.getElementById('pelicula');
        peliculas.forEach(pelicula => {
            const option = document.createElement('option');
            option.value = pelicula.peli_id; //Se asigna los diferentes id 
            option.textContent = pelicula.titulo;
            peliculaSelect.appendChild(option);
        });
        
        //carga de horas
        peliculaSelect.addEventListener('change', async function() {
            const selectedPeliculaId = peliculaSelect.value;
            
            // Obtener los horarios de la película seleccionada
            const horariosResponse = await fetch(`/horas/${selectedPeliculaId}`);
            const horarios = await horariosResponse.json();
            
            
            const horarioSelect = document.getElementById('horario');
            horarioSelect.innerHTML = 'Hora'; 
            
            
            horarios.forEach(horario => {
                const option = document.createElement('option');
                option.value = horario.hora_id; 
                option.textContent = horario.hora_peli
                horarioSelect.appendChild(option);
            });
        });  
         
        const horarioSelect = document.getElementById('horario');

        horarioSelect.addEventListener('change', async function() {
            const selectedHorarioId = horarioSelect.value;
            const selectedPeliculaId = peliculaSelect.value;
             // Accediendo al valor de horarioSelect

            
            // Obtener el formato para la película y horario seleccionados
            const formatoResponse = await fetch(`/formato/${selectedPeliculaId},${selectedHorarioId}`);
            const formato = await formatoResponse.json();
            
            // Mostrar el formato obtenido en el input correspondiente
            const formatoInput = document.getElementById('formato');
            formatoInput.innerHTML = ''; 

            formato.forEach(form => {
                const option = document.createElement('option');
                option.value = form.formato_id; 
                option.textContent = form.tipo;
                formatoInput.appendChild(option);
            });

            //Al cargar el horario se carga el formato y los asientos disponibles   
            const selectedFormato = formatoInput.value

            const asientoResponse = await fetch(`/asiento/${selectedPeliculaId},${selectedHorarioId},${selectedFormato}`)
            const asientos = await asientoResponse.json();

            const asientoSelect = document.getElementById('asiento');
            asientoSelect.innerHTML =""; // Limpiar opciones existentes
        
            asientos.forEach(asiento => {
                const option = document.createElement('option');
                option.value = asiento.asi_id;
                option.textContent = `${asiento.fila}-${asiento.numero}`;
                asientoSelect.appendChild(option);
            });

                const montoResponse = await fetch(`/formato/${selectedPeliculaId},${selectedHorarioId}`);
                const montos = await montoResponse.json();
                const montoSeleccionado = montos.find(formato => formato.formato_id === parseInt(selectedFormato));
            
                // Actualizar  monto
                if (montoSeleccionado) {
                    let monto = 0;
                    switch (montoSeleccionado.tipo) {
                        case '2D':
                            monto = 4500;
                            break;
                        case '3D':
                            monto = 5500;
                            break;
                        case '4D':
                            monto = 6500;
                            break;
                        default:
                            monto = 4500;
                            break;
                    }
            
                    // Asignar el monto al campo correspondiente
                    const montoInput = document.getElementById('monto');
                    montoInput.value = monto;
                }
            
                    
        });




    

    } catch (error) {
        
        console.error('Error:', error);
        alert('Error al cargar las películas');
    }
});



