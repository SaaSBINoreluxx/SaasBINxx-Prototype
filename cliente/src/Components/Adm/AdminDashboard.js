import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import "./AdminDashboard.css"

// Datos de ejemplo para el gráfico
const data = [
    { name: 'Tareas completadas', value: 400 },
    { name: 'Tareas pendientes', value: 300 },
    // Añade más datos según sea necesario
];

const dataBarChart = [
    { name: 'Enero', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Febrero', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Marzo', uv: 2000, pv: 9800, amt: 2290 },
    // Añade más datos según sea necesario
];

const COLORS = ['#ADDF00', '#13FEB3', '#FFBB28', '#FF8042']; // Colores para cada sección del gráfico Doughnut (ahora usando PieChart)

function AdminDashboard() {
    return (
        <div className='container' >
            <div className="admin-dashboard">
                <div className='row'>
                    <div className='chart-container'>
                        <ResponsiveContainer width="99%" height="100%" aspect={4 / 3}>
                            <h2>Progreso de tareas</h2>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="70%"
                                    outerRadius="80%"
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

                    <div className='chart-container'>
                        <h2>Consumo de Materiales por Operador</h2>
                        <ResponsiveContainer width="99%" height="100%" aspect={4 / 3}>
                            <BarChart data={dataBarChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" stackId="a" fill="#8884d8" barSize={10}/>
                                <Bar dataKey="uv" stackId="a" fill="#82ca9d" barSize={10}/>
                                <Bar dataKey="amt" stackId="a" fill="#ffc658" barSize={10}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className='row'>
                    <div className='chart-container'>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default AdminDashboard;