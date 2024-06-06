import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import "./AdminDashboard.css"


// Datos de ejemplo para el gráfico
const data = [
    { name: 'Tareas completadas', value: 400 },
    { name: 'Tareas pendientes', value: 200 },
    { name: 'Tareas en progreso', value: 150 },
    { name: 'Tareas no iniciadas', value: 15 },
    // Añade más datos según sea necesario
];

const COLORS = ['#00A468', '#E83109', '#DAD700', '#6D6D6D']; // Colores para cada sección del gráfico Doughnut (ahora usando PieChart)

const dataBarChart = [
    { name: 'Enero', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Febrero', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Marzo', uv: 2000, pv: 9800, amt: 2290 },
    // Añade más datos según sea necesario
];

const exportPDF = () => {
    const input = document.getElementById('chart1');
    html2canvas(input, { scale: 2, }).then((canvas) => { // scale:2 Aumenta la resolución de la imagen sin estop la imagen muestra fondo irregular
        const imgData = canvas.toDataURL('image/png');

        // Inicia un nuevo documento PDF en formato A4
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Define márgenes y dimensiones útiles
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageMargin = 10; // Márgenes de 10 mm
        const textMargin = 5; // Espacio adicional debajo del texto

        // Posiciones iniciales
        let yPosition = pageMargin;

        // Añade un título y algunos párrafos de texto
        pdf.setFontSize(16); // Tamaño grande para el título
        pdf.text('Título del Informe/reporte', pageMargin, yPosition);
        yPosition += 10; // Espacio después del título

        pdf.setFontSize(12); // Tamaño más pequeño para el texto normal
        pdf.text('Este es un párrafo introductorio que explica el contexto del gráfico.', pageMargin, yPosition);
        yPosition += 10 + textMargin; // Ajuste después del párrafo

        // Calcula el tamaño de la imagen para mantener la relación de aspecto
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth - pageMargin * 2;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        yPosition = Math.min(yPosition, pageHeight - imgHeight - pageMargin); // Asegura que la imagen no se salga de la página

        // Añade la imagen
        pdf.addImage(imgData, 'PNG', pageMargin, yPosition, imgWidth, imgHeight);

        // Actualiza la posición Y después de la imagen
        yPosition += imgHeight + textMargin;

        // Asegúrate de que la nueva posición no se salga de la página para el texto final
        if (yPosition >= pageHeight - pageMargin) {
            pdf.addPage();
            yPosition = pageMargin; // Restablece la posición a la parte superior de la nueva página
        }

        // Añade el texto final después de la imagen
        pdf.text('Este párrafo explica detalles adicionales sobre los datos del gráfico.', pageMargin, yPosition);

        // Guarda el documento
        pdf.save("download.pdf");
    });
}



function AdminDashboard() {
    return (
        <div className='container' >
            <div className="admin-dashboard">
                <div className='row'>
                    <div id="chart1" className='chart-container'>
                        <ResponsiveContainer width="99%" height="100%" aspect={4 / 3}>
                            <h2>Progreso de tareas</h2>

                            <PieChart>
                                <Legend layout="vertical" align="right" verticalAlign="middle" />
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="55%"
                                    outerRadius="70%"
                                    fill="#8884d8"
                                    paddingAngle={4}
                                    dataKey="value"
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div id="chart2" className='chart-container'>
                        <h2>Consumo de Materiales por Operador</h2>
                        <ResponsiveContainer width="99%" height="100%" aspect={4 / 3}>
                            <BarChart data={dataBarChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" stackId="a" fill="#8884d8" barSize={10} />
                                <Bar dataKey="uv" stackId="a" fill="#82ca9d" barSize={10} />
                                <Bar dataKey="amt" stackId="a" fill="#ffc658" barSize={10} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className='row'>
                    <div id="chart3" className='chart-container'>
                        <h2>Progreso individual de tareas</h2>
                        <ResponsiveContainer width="99%" height="100%" aspect={10 / 3}>
                            <BarChart layout="vertical" data={dataBarChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" stackId="a" fill="#8884d8" barSize={10} />
                                <Bar dataKey="uv" stackId="a" fill="#82ca9d" barSize={10} />
                                <Bar dataKey="amt" stackId="a" fill="#ffc658" barSize={10} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <button className='standard-button' onClick={exportPDF}>Exportar a PDF</button>

            </div>
        </div>

    );
}

export default AdminDashboard;