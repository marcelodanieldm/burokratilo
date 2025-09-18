async function login(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.currentUser = data; // Simula sesión global
            Router.goTo('home');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert('Error en el servidor');
    }
}