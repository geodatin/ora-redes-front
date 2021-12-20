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
import { useTheme } from 'react-jss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = `"Roboto", "Helvetica", "Arial", sans-serif`;
ChartJS.defaults.font.weight = '500';
ChartJS.defaults.font.size = 16;

export default function ChartDefaults() {
  const theme = useTheme();
  ChartJS.defaults.color = theme.background.main;
  ChartJS.defaults.color = theme.secondary.dark;
  ChartJS.defaults.maintainAspectRatio = false;
  ChartJS.defaults.responsive = true;
  ChartJS.defaults.plugins.title.display = false;

  return null;
}
