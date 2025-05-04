"use client";
import { useGetAllContentQuery } from '@/components/redux/features/content/contentApi';
import {  useGetAllPaymentsQuery } from '@/components/redux/features/payment/paymentApi';
import { useGetAllUserQuery } from '@/components/redux/features/user/userApi';
import { useState, useMemo } from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: string;
  color: string;
}

interface ChartData {
  name: string;
  sales: number;
  rentals: number;
}

const OverviewStats = () => {
  const [timeFilter, setTimeFilter] = useState<'7days' | '30days' | '90days' | '1year'>('30days');
  const [chartType, setChartType] = useState<'sales' | 'rentals'>('sales');

  // Demo statistics
  const statsData = {
    totalUsers: '124,856',
    totalMovies: '35,789',
    totalPurchases: '89,432',
    totalEarnings: '$2,456,230'
  };

  const { data: users, isLoading } = useGetAllUserQuery(undefined);
  const { data: movie } = useGetAllContentQuery([{}]);
  const {data: payments} = useGetAllPaymentsQuery({});
  console.log(payments);

  const earnings = payments?.data?.reduce((acc: number, payment: any) => {
    const amount = payment.amount || 0;
    return acc + amount;
  }, 0);  
 
  

  // Dynamic data generator
  const generateChartData = (range: typeof timeFilter): ChartData[] => {
    const now = new Date();
    const data: ChartData[] = [];

    switch (range) {
      case '7days':
        return Array.from({ length: 7 }).map((_, i) => ({
          name: new Date(now.setDate(now.getDate() - 6 + i)).toLocaleDateString('en-US', { weekday: 'short' }),
          sales: Math.floor(Math.random() * 1000) + 500,
          rentals: Math.floor(Math.random() * 800) + 300
        }));

      case '30days':
        return Array.from({ length: 4 }).map((_, i) => ({
          name: `Week ${i + 1}`,
          sales: Math.floor(Math.random() * 3000) + 1500,
          rentals: Math.floor(Math.random() * 2500) + 1000
        }));

      case '90days':
        return Array.from({ length: 12 }).map((_, i) => ({
          name: `W${i + 1}`,
          sales: Math.floor(Math.random() * 5000) + 2000,
          rentals: Math.floor(Math.random() * 4000) + 1500
        }));

      case '1year':
        return Array.from({ length: 12 }).map((_, i) => ({
          name: new Date(2023, i).toLocaleDateString('en-US', { month: 'short' }),
          sales: Math.floor(Math.random() * 15000) + 5000,
          rentals: Math.floor(Math.random() * 12000) + 4000
        }));

      default:
        return [];
    }
  };

  const chartData = useMemo(() => generateChartData(timeFilter), [timeFilter]);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#00031b] p-4 rounded-lg border border-[#1a2d6d]">
          <p className="text-purple-400 font-semibold mb-2">
            {timeFilter === '7days' ? 'Day' : 
             timeFilter === '30days' ? 'Week' : 
             timeFilter === '90days' ? 'Week' : 'Month'}: {label}
          </p>
          <div className="space-y-1">
            <p className="text-sm text-purple-200">
              <span className="inline-block w-16">Sales:</span> 
              <span className="ml-2">${payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-sm text-purple-200">
              <span className="inline-block w-16">Rentals:</span> 
              <span className="ml-2">${payload[1].value.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // XAxis label formatter
  const xAxisFormatter = (value: string) => {
    if (timeFilter === '1year') return value.slice(0, 3);
    return value;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={users?.data?.length || '0'}
          trend="12.5%"
          icon="👥"
          color="bg-purple-500/20"
        />
        <StatCard 
          title="Total Movies" 
          value={movie?.data?.length || '0'}
          trend="8.2%"
          icon="🎬"
          color="bg-blue-500/20"
        />
        <StatCard 
          title="Total Purchases" 
          value={payments?.data?.length || '0'}
          trend="18.4%"
          icon="💰"
          color="bg-green-500/20"
        />
        <StatCard 
          title="Total Earnings" 
          value={earnings || '0'}
          trend="22.3%"
          icon="💸"
          color="bg-pink-500/20"
        />
      </div>

      {/* Analytics Section */}
      <div className="bg-gradient-to-br from-[#000a3a] to-[#000a3a]/50 p-6 rounded-xl border border-[#00175f]/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-lg font-semibold">Sales & Rental Analytics</h3>
          <div className="flex gap-3">
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as typeof timeFilter)}
              className="bg-[#00031b] px-3 py-2 rounded-lg text-sm border border-[#00175f]/50"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
            <div className="flex gap-2 bg-[#00031b] p-1 rounded-lg">
              <button 
                onClick={() => setChartType('sales')}
                className={`px-3 py-1 rounded-md text-sm ${
                  chartType === 'sales' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400'
                }`}
              >
                Sales
              </button>
              <button 
                onClick={() => setChartType('rentals')}
                className={`px-3 py-1 rounded-md text-sm ${
                  chartType === 'rentals' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400'
                }`}
              >
                Rentals
              </button>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-96 bg-[#00031b] rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'sales' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2d6d" />
              <XAxis 
                dataKey="name" 
                stroke="#8b5cf6" 
                tick={{ fill: '#8b5cf6' }}
                tickFormatter={xAxisFormatter}
              />
              <YAxis 
                stroke="#8b5cf6" 
                tick={{ fill: '#8b5cf6' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => (
                  <span className="text-purple-400 capitalize">{value}</span>
                )}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
              <Line 
                type="monotone" 
                dataKey="rentals" 
                stroke="#4f46e5" 
                strokeWidth={2}
                dot={{ fill: '#4f46e5' }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2d6d" />
              <XAxis 
                dataKey="name" 
                stroke="#8b5cf6" 
                tick={{ fill: '#8b5cf6' }}
                tickFormatter={xAxisFormatter}
              />
              <YAxis 
                stroke="#8b5cf6" 
                tick={{ fill: '#8b5cf6' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'transparent' }}
              />
              <Bar 
                dataKey="sales" 
                fill="#8b5cf6" 
                radius={[4, 4, 0, 0]}
                activeBar={false}
                style={{ fillOpacity: 1 }}
              />
              <Bar 
                dataKey="rentals" 
                fill="#4f46e5" 
                radius={[4, 4, 0, 0]}
                activeBar={false}
                style={{ fillOpacity: 1 }}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
        </div>
      </div>

     
    </div>
  );
};

// StatCard Component
const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => (
  <div className="bg-gradient-to-br from-[#000a3a] to-[#000a3a]/50 p-6 rounded-xl border border-[#00175f]/30">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-gray-400 text-sm mb-2">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
        <span className="text-green-400 text-sm mt-2 inline-flex items-center">
          ↑ {trend} <span className="text-gray-500 ml-2">vs last month</span>
        </span>
      </div>
      <div className={`${color} p-3 rounded-lg`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </div>
);

export default OverviewStats;