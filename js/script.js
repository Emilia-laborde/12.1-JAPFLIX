document.addEventListener("DOMContentLoaded", function() {
    
    fetch(`https://japceibal.github.io/japflix_api/movies-data.json`)
    .then(response => response.json())
    .then(data => {
        const peliculas = data; 
        const btnBuscar = document.getElementById("btnBuscar");
        const inputBuscar = document.getElementById('inputBuscar');
        const lista = document.getElementById("lista");

        btnBuscar.addEventListener("click", function() {
            const textoBusqueda = inputBuscar.value.toLowerCase(); 
            if (textoBusqueda) {
                const peliculasFiltradas = peliculas.filter(pelicula =>
                    pelicula.title.toLowerCase().includes(textoBusqueda) ||
                    pelicula.tagline.toLowerCase().includes(textoBusqueda) ||
                    pelicula.overview.toLowerCase().includes(textoBusqueda) ||
                    pelicula.genres.some(genero => genero.name.toLowerCase().includes(textoBusqueda))
                );
                mostrarPeliculas(peliculasFiltradas);  
            }
        });

        function mostrarPeliculas(array) { 
            lista.innerHTML = ''; 
            array.forEach(pelicula => {  
                lista.innerHTML += `
                    <li class="list-group-item bg-dark mb-1 rounded" data-bs-toggle="offcanvas" data-bs-target="#a${pelicula.id}">
                        <h5 class="fw-bold text-white">${pelicula.title} ${estrellitas(pelicula.vote_average)}</h5>
                        <p class="text-muted fst-italic">${pelicula.tagline}</p>
                    </li>
                    <div class="offcanvas offcanvas-top" tabindex="-1" id="a${pelicula.id}">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title">${pelicula.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>
                        <div class="offcanvas-body">
                            <p>${pelicula.overview}</p>
                            <p><strong>Géneros:</strong> ${pelicula.genres.map(genero => genero.name).join(', ')}</p>  // "Genres" a "Géneros"
                            <p><strong>Año:</strong> ${pelicula.release_date.substring(0, 4)}</p>  // "Year" a "Año"
                            <p><strong>Duración:</strong> ${pelicula.runtime} mins</p>  // "Runtime" a "Duración"
                        </div>
                    </div>`;
            });
        }

        function estrellitas(voto) { 
            const marcarEstrellas = Math.floor(voto / 2);  
            return '<span class="fa fa-star checked"></span>'.repeat(marcarEstrellas) + 
                   '<span class="fa fa-star not-checked"></span>'.repeat(5 - marcarEstrellas);
        }
    });
});
