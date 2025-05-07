"use client"
 
import { useDashboardStatsQuery } from '@/components/redux/features/admin/adminApi';
import { useGetAllContentQuery } from '@/components/redux/features/content/contentApi';
import { useGetAllPaymentsQuery } from '@/components/redux/features/payment/paymentApi';
import { useGetAllUserQuery } from '@/components/redux/features/user/userApi';
import { useState, useMemo } from 'react';
import {
  LineChart, BarChart, Line, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: string;
  color: string;
}

interface ChartData {
  name: string;
  earnings: number;
  count: number;
}

const groupPayments = (payments: any[], filter: string, now: Date): ChartData[] => {
  const groups: ChartData[] = [];
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
 

  switch (filter) {
    case '7days':
      Array.from({ length: 7 }).forEach((_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - 6 + i);
        const result = payments.reduce((acc, p) => {
          if (formatDate(new Date(p.createdAt)) === formatDate(date)) {
            acc.total += p.amount;
            acc.count++;
          }
          return acc;
        }, { total: 0, count: 0 });
        groups.push({
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          earnings: result.total,
          count: result.count
        });
      });
      break;

    case '30days':
      Array.from({ length: 4 }).forEach((_, i) => {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (7 * (4 - i)));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        const result = payments.reduce((acc, p) => {
          const paymentDate = new Date(p.createdAt);
          if (paymentDate >= weekStart && paymentDate < weekEnd) {
            acc.total += p.amount;
            acc.count++;
          }
          return acc;
        }, { total: 0, count: 0 });
        groups.push({ 
          name: `Week ${i + 1}`, 
          earnings: result.total,
          count: result.count
        });
      });
      break;

    case '90days':
      Array.from({ length: 3 }).forEach((_, i) => {
        const start = new Date(now);
        start.setDate(start.getDate() - (90 - 30 * i));
        const end = new Date(start);
        end.setDate(start.getDate() + 30);
        const result = payments.reduce((acc, p) => {
          const paymentDate = new Date(p.createdAt);
          if (paymentDate >= start && paymentDate < end) {
            acc.total += p.amount;
            acc.count++;
          }
          return acc;
        }, { total: 0, count: 0 });
        groups.push({ 
          name: `Month ${i + 1}`, 
          earnings: result.total,
          count: result.count
        });
      });
      break;

    case '1year':
      Array.from({ length: 12 }).forEach((_, i) => {
        const month = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
        const result = payments.reduce((acc, p) => {
          const d = new Date(p.createdAt);
          if (d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear()) {
            acc.total += p.amount;
            acc.count++;
          }
          return acc;
        }, { total: 0, count: 0 });
        groups.push({ 
          name: month.toLocaleDateString('en-US', { month: 'short' }), 
          earnings: result.total,
          count: result.count
        });
      });
      break;
  }

  return groups;
};

const OverviewStats = () => {
  const [timeFilter, setTimeFilter] = useState<'7days' | '30days' | '90days' | '1year'>('30days');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [displayMode, setDisplayMode] = useState<'earnings' | 'count'>('earnings');

   
  const { data: payments } = useGetAllPaymentsQuery({});
  const {data} = useDashboardStatsQuery([]);
  // console.log(payments);
  
  

   

  const generateChartData = useMemo(() => {
    if (!payments?.data) return [];
    const now = new Date();
    return groupPayments(payments.data, timeFilter, now);
  }, [timeFilter, payments]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-[#00031b] p-4 rounded-lg border border-[#1a2d6d]">
          <p className="text-purple-400 font-semibold mb-2">
            {['7days', '30days', '90days'].includes(timeFilter) ? 'Period' : 'Month'}: {label}
          </p>
          <div className="space-y-1">
            <p className="text-sm text-purple-200">
              Transactions: <span className="ml-2">{payload[0].payload.count}</span>
            </p>
            <p className="text-sm text-purple-200">
              Earnings: <span className="ml-2">${payload[0].payload.earnings.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-2 md:p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={data?.data?.totalUser || '0'} trend="12.5%" icon="👥" color="bg-purple-500/20" />
        <StatCard title="Total Movies" value={data?.data?.totalMovies || '0'} trend="8.2%" icon="🎬" color="bg-blue-500/20" />
        <StatCard title="Total Transactions" value={data?.data?.totalPayment || '0'} trend="18.4%" icon="💳" color="bg-green-500/20" />
        <StatCard title="Total Earnings" value={`$${data?.data?.totalEaring?._sum?.amount || '0'}`} trend="22.3%" icon="💰" color="bg-pink-500/20" />
      </div>

      <div className="bg-gradient-to-br from-[#000a3a] to-[#000a3a]/50 p-2 md:p-6 rounded-xl border border-[#00175f]/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-lg font-semibold">Payment Analytics</h3>
          <div className="flex flex-wrap gap-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="bg-[#00031b] px-3 py-2 rounded-lg text-sm border border-[#00175f]/50"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
            <div className="flex gap-2 bg-[#00031b] p-1 rounded-lg">
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded-md text-sm ${chartType === 'line' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400'}`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 rounded-md text-sm ${chartType === 'bar' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400'}`}
              >
                Bar
              </button>
            </div>
            <div className="flex gap-2 bg-[#00031b] p-1 rounded-lg">
              <button
                onClick={() => setDisplayMode('count')}
                className={`px-3 py-1 rounded-md text-sm ${displayMode === 'count' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400'}`}
              >
                Show Count
              </button>
              <button
                onClick={() => setDisplayMode('earnings')}
                className={`px-3 py-1 rounded-md text-sm ${displayMode === 'earnings' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400'}`}
              >
                Show Earnings
              </button>
            </div>
          </div>
        </div>

        <div className="h-96 bg-[#00031b] rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={generateChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2d6d" />
                <XAxis dataKey="name" stroke="#8b5cf6" tick={{ fill: '#8b5cf6' }} />
                <YAxis 
                  stroke="#8b5cf6" 
                  tickFormatter={(value) => 
                    displayMode === 'earnings' ? `$${value.toLocaleString()}` : value.toLocaleString()
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={displayMode === 'earnings' ? 'earnings' : 'count'} 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  dot={{ fill: '#8b5cf6' }} 
                />
              </LineChart>
            ) : (
              <BarChart data={generateChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2d6d" />
                <XAxis dataKey="name" stroke="#8b5cf6" tick={{ fill: '#8b5cf6' }} />
                <YAxis 
                  stroke="#8b5cf6" 
                  tickFormatter={(value) => 
                    displayMode === 'earnings' ? `$${value.toLocaleString()}` : value.toLocaleString()
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey={displayMode === 'earnings' ? 'earnings' : 'count'} 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => (
  <div className="bg-gradient-to-br from-[#000a3a] to-[#000a3a]/50 p-6 rounded-xl border border-[#00175f]/30">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-gray-400 text-sm mb-2">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
        
      </div>
      <div className={`${color} p-3 rounded-lg`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </div>
);

export default OverviewStats;