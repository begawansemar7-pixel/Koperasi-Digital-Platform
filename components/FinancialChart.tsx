
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SHU_PROJECTION_DATA } from '../constants';

const FinancialChart: React.FC = () => {
  
  const formatYAxis = (tickItem: number) => {
    return `Rp${(tickItem / 1000).toLocaleString('id-ID')}k`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded-md shadow-md">
          <p className="label font-semibold">{`${label}`}</p>
          <p className="intro text-primary">{`SHU : Rp${payload[0].value.toLocaleString('id-ID')}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-96">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Proyeksi Sisa Hasil Usaha (SHU)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={SHU_PROJECTION_DATA}
          margin={{
            top: 5,
            right: 20,
            left: 30,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{paddingTop: '20px'}} />
          <Bar dataKey="SHU" fill="#c81e1e" name="Sisa Hasil Usaha" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;
