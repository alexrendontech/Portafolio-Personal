// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Toggle para el menú móvil
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarNav = document.getElementById('navbarNav');
            if (navbarNav.classList.contains('show')) {
                navbarNav.classList.remove('show');
            } else {
                navbarNav.classList.add('show');
            }
        });
    }
    
    // Funcionalidad para cambiar entre tema claro y oscuro
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Cambiar tema al hacer clic en el botón
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
    
    // Array hexadecimal para generar colores aleatorios
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    
    // Función para obtener un número aleatorio
    function getRandomNumber() {
        return Math.floor(Math.random() * hex.length);
    }
    
    // Función para generar un color hexadecimal aleatorio
    function getRandomColor() {
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hex[getRandomNumber()];
        }
        return hexColor;
    }
    
    // Función para determinar si un color es claro u oscuro
    function isLightColor(color) {
        // Convertir color hexadecimal a RGB
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        
        // Calcular la luminosidad perceptiva
        // Fórmula: 0,299*R + 0,587*G + 0,114*B
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // Si la luminosidad es mayor a 128, es un color claro
        return brightness > 128;
    }
    
    // Agregar botón de cambio de color a la página
    const colorChangerContainer = document.createElement('div');
    colorChangerContainer.className = 'container mt-4 mb-4 text-center';
    colorChangerContainer.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2 class="mb-0">Cambiador de Color</h2>
        </div>
        <div class="card-body">
          <h3>Color de fondo: <span class="color-value">#ffffff</span></h3>
          <button class="btn btn-primary mt-2" id="colorBtn">Cambiar Color</button>
        </div>
      </div>
    `;
    
    // Insertar el contenedor después del encabezado
    const headerSection = document.querySelector('.header-section');
    if (headerSection) {
        headerSection.parentNode.insertBefore(colorChangerContainer, headerSection.nextSibling);
    }
    
    // Obtener el botón y el elemento que muestra el valor del color
    const colorBtn = document.getElementById('colorBtn');
    const colorValue = document.querySelector('.color-value');
    
    // Cambiar color al hacer clic en el botón
    colorBtn.addEventListener('click', function() {
        // Generar un color aleatorio
        const newColor = getRandomColor();
        
        // Establecer el nuevo color de fondo
        document.body.style.backgroundColor = newColor;
        colorValue.textContent = newColor;
        
        // Ajustar el color del texto según el color de fondo
        if (isLightColor(newColor)) {
            document.body.style.color = '#333333';
        } else {
            document.body.style.color = '#ffffff';
        }
        
        // Si el tema oscuro está activo, desactivarlo
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Manejar el envío del formulario de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener el valor del correo electrónico
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Aquí podrías implementar la lógica para enviar el correo a tu servicio de newsletter
            console.log('Suscripción al newsletter:', email);
            
            // Mostrar un mensaje de confirmación
            alert('¡Gracias por suscribirte a nuestro newsletter!');
            
            // Limpiar el formulario
            newsletterForm.reset();
        });
    }
    
    // Agregar efectos de transición para las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});