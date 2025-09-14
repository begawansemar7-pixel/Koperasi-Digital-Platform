import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Savings } from '../types';

interface SavingsChartProps {
    data: Savings;
}

const SavingsChart: React.FC<SavingsChartProps> = ({ data }) => {
    const chartData = [
        { name: 'Simpanan Pokok', value: data.principal },
        { name: 'Simpanan Wajib', value: data.mandatory },
        { name: 'Simpanan Sukarela', value: data.voluntary },
    ];

    // Colors that complement the primary theme
    const COLORS = ['#e25656', '#1E3A8A', '#F59E0B'];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border rounded-md shadow-md">
                    <p className="label font-semibold">{`${payload[0].name}`}</p>
                    <p className="intro" style={{ color: payload[0].payload.fill }}>
                        {`Jumlah : Rp${payload[0].value.toLocaleString('id-ID')}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Komposisi Simpanan</h3>
            <div className="flex-grow w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: '0.875rem'}}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SavingsChart;