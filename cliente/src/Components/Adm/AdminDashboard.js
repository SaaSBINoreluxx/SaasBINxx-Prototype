import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

// Datos de ejemplo para el gráfico
const data = [
    { name: 'Tareas completadas', value: 400 },
    { name: 'Tareas pendientes', value: 300 },
    // Añade más datos según sea necesario
];

const dataBarChart = [
    { name: 'Operador 1', materiales: 400 },
    { name: 'Operador 2', materiales: 300 },
    { name: 'Operador 3', materiales: 200 },
    { name: 'Operador 4', materiales: 278 },
    { name: 'Operador 5', materiales: 189 },
];

const COLORS = ['#ADDF00', '#13FEB3', '#FFBB28', '#FF8042']; // Colores para cada sección del gráfico Doughnut (ahora usando PieChart)

function AdminDashboard() {
    return (
        <div className='container' >
            <div className="admin-dashboard">
                <h1>Panel de Administrador</h1>
                {/* Gráfico Doughnut (usando PieChart) para el progreso de las tareas */}
                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        innerRadius={80}
                        outerRadius={120}
                        fill="#8884d8"
                        paddingAngle={5}
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

                <h2>Consumo de Materiales por Operador</h2>
                <BarChart
                    width={300}
                    height={200}
                    data={dataBarChart}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="materiales" fill="#00DFC4" />
                </BarChart>

                {/* Puedes añadir más gráficos y datos aquí */}
            </div>
        </div>

    );
}

export default AdminDashboard;