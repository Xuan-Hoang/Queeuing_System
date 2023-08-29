/* eslint-disable @typescript-eslint/no-unused-vars */
import { Chart, LinearScale } from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux'; // Import dispatch và useSelector từ react-redux
import { AppDispatch, RootState } from '../../../redux/store';

Chart.register(LinearScale);

interface Data {
  data: number[];
  tension: number;
  borderColor: string;
  pointBorderColor: string;
  backgroundColor: CanvasGradient;
  fill: boolean;
  spanGaps: boolean;
}

interface ChartLine {
  labels: string[];
  datasets: Data[];
}

function TableDashboard() {
  const [chartData, setChartData] = useState<ChartLine>({
    labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        data: Array.from({ length: 31 }, () => 0),
        tension: 0.5,
        borderColor: '#5185F7',
        pointBorderColor: 'transparent',
        backgroundColor: {} as CanvasGradient,
        fill: true,
        spanGaps: true,
      },
    ],
  });

  const LinearGradientBackground = () => {
    const color = document.createElement('canvas').getContext('2d');
    if (color) {
      const gradient = color.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, '#5185F7');
      gradient.addColorStop(0.9, '#FFFFFF');
      return gradient;
    }
    return {} as CanvasGradient;
  };

  const dispatch: AppDispatch = useDispatch();

  const numberLevels = useSelector((state: RootState) => state.numberLevels);

  useEffect(() => {
    const maxNumberOrders: number[] = Array.from({ length: 31 }, () => 0);

    numberLevels.forEach((data) => {
      const issuanceDate = new Date(data.issuanceDate.toDate());

      const day = issuanceDate.getDate();
      if (data.numberOrder > maxNumberOrders[day - 1]) {
        maxNumberOrders[day - 1] = data.numberOrder;
      }
    });

    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: maxNumberOrders,
          backgroundColor: LinearGradientBackground(),
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberLevels]);

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
        },
      },
      x: {
        grid: {
          display: false,
          drawTicks: false,
          drawBorder: false,
          drawOnChartArea: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '360px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default TableDashboard;
