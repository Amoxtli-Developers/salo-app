import React from 'react';

const ConfiguracionPage: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <header style={{ marginBottom: '20px' }}>
                <h1>Configuración</h1>
            </header>
            <main>
                <section style={{ marginBottom: '20px' }}>
                    <h2>Sección 1</h2>
                    <p>Contenido de la sección 1.</p>
                </section>
                <section style={{ marginBottom: '20px' }}>
                    <h2>Sección 2</h2>
                    <p>Contenido de la sección 2.</p>
                </section>
            </main>
            <footer style={{ marginTop: '20px' }}>
                <p>© 2023 Salo App</p>
            </footer>
        </div>
    );
};

export default ConfiguracionPage;