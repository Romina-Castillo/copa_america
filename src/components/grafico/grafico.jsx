import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const EstadisticasRadar = ({ estadisticasEquipo1, estadisticasEquipo2, equipo1, equipo2 }) => {
    const data = {
        labels: [
            "Remates",
            "Remates a Puerta",
            "Faltas",
            "Tarjetas Amarillas",
            "Corners",
        ],
        datasets: [
            {
                label: equipo1,
                data: [
                    estadisticasEquipo1.remates,
                    estadisticasEquipo1.remates_a_puerta,
                    estadisticasEquipo1.faltas,
                    estadisticasEquipo1.tarjetas_amarillas,
                    estadisticasEquipo1.corners,
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
            },
            {
                label: equipo2,
                data: [
                    estadisticasEquipo2.remates,
                    estadisticasEquipo2.remates_a_puerta,
                    estadisticasEquipo2.faltas,
                    estadisticasEquipo2.tarjetas_amarillas,
                    estadisticasEquipo2.corners,
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: { // es el eje radial 
                min: 0, // valor mínimo
                max: 20, // valor máximo
                ticks: {
                    stepSize: 10, // Incrementos entre las líneas
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.2)", // Opcional: color de las líneas de la cuadrícula
                },
            },
        },
    };


    return <Radar data={data} options={options} />;
};