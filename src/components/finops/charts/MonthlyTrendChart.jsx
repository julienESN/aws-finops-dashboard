import {
  AreaChart,
  Area,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

// Composant pour afficher l'évolution des coûts mensuels
const MonthlyTrendChart = ({ data }) => {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        Évolution des coûts mensuels
      </h4>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
          >
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={(value) => {
                const [, month] = value.split('-');
                const monthNames = [
                  'Jan',
                  'Fév',
                  'Mar',
                  'Avr',
                  'Mai',
                  'Juin',
                  'Juil',
                  'Août',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Déc',
                ];
                return monthNames[parseInt(month) - 1];
              }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={(value) => `${value.toLocaleString()} €`}
            />
            <Tooltip
              formatter={(value) => [`${value.toLocaleString()} €`, 'Coût']}
              labelFormatter={(value) => {
                const [year, month] = value.split('-');
                const monthNames = [
                  'Janvier',
                  'Février',
                  'Mars',
                  'Avril',
                  'Mai',
                  'Juin',
                  'Juillet',
                  'Août',
                  'Septembre',
                  'Octobre',
                  'Novembre',
                  'Décembre',
                ];
                return `${monthNames[parseInt(month) - 1]} ${year}`;
              }}
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorCost)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyTrendChart;
