import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function BPChart({ readings }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blood Pressure Readings',
      },
    },
    scales: {
      y: {
        min: 40,
        max: 200,
      },
    },
  };

  const data = {
    labels: readings.map(reading => new Date(reading.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Systolic',
        data: readings.map(reading => reading.systolic),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Diastolic',
        data: readings.map(reading => reading.diastolic),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div>
      {readings.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No readings yet. Add your first reading!
        </div>
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
}

export default BPChart;