async enviarTramite() {
    const tipo = document.getElementById('tipo').value;
    const comentarios = document.getElementById('comentarios').value;
    const archivoInput = document.getElementById('archivo');
    const archivo = archivoInput.files[0];

    if (!tipo || !comentarios || !archivo) {
        alert("Completa todos los campos");
        return;
    }

    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('comentarios', comentarios);
    formData.append('archivo', archivo);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    try {
        const response = await fetch('http://localhost:5000/api/tramites', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Trámite creado");
            new SolicitanteHomeView(window.currentUser);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert('Error al crear trámite');
    }
}