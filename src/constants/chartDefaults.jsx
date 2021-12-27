import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme } from 'react-jss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

ChartJS.defaults.font.family = `"Roboto", "Helvetica", "Arial", sans-serif`;
ChartJS.defaults.font.weight = '500';
ChartJS.defaults.font.size = 16;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;
ChartJS.defaults.plugins.title.display = false;
ChartJS.defaults.plugins.legend.display = true;
ChartJS.defaults.plugins.legend.position = 'bottom';
ChartJS.defaults.scale.ticks.crossAlign = 'far';
ChartJS.defaults.scale.ticks.align = 'center';
ChartJS.defaults.scale.ticks.autoSkip = true;
ChartJS.defaults.scale.ticks.autoSkipPadding = 1;
ChartJS.defaults.scale.ticks.padding = 10;
ChartJS.defaults.scale.ticks.labelOffset = 0;
ChartJS.defaults.scale.beginAtZero = true;
ChartJS.defaults.scale.grace = '80%';
ChartJS.defaults.plugins.datalabels.display = false;
ChartJS.defaults.layout.autoPadding = false;
ChartJS.defaults.layout.padding = { top: 0, right: 0, bottom: 0, left: 0 };

export default function ChartDefaults() {
  const theme = useTheme();

  ChartJS.defaults.color = theme.secondary.dark;
  ChartJS.defaults.scale.grid.color = theme.stroke.light;

  return null;
}
