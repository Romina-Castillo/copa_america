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
            "Posesión",
            "Pases",
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
                    estadisticasEquipo1.posesion,
                    estadisticasEquipo1.pases,
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
                    estadisticasEquipo2.posesion,
                    estadisticasEquipo2.pases,
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
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
    };

    return <Radar data={data} options={options} />;
};