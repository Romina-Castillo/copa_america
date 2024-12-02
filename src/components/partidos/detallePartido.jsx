import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent, Grid } from "@mui/material";
import { partidos } from "./partidos";
import { jugadoresArgentina } from "../jugadores/Argentina";
import { EstadisticasRadar } from "../grafico/grafico";

const DetallePartido = () => {
    const { id } = useParams();
    const partidoId = parseInt(id, 10); // Validación de ID
    const partido = partidos.find((p) => p.id === partidoId);
    const findPlayerData = (nombre) => jugadoresArgentina.find((jugador) => jugador.nombre === nombre);

    // Validar si el partido existe
    if (isNaN(partidoId) || !partido) {
        return <Typography variant="h6">Partido no encontrado</Typography>;
    }

    const estadisticas = partido.estadisticas;

    // Validar si las estadísticas están disponibles
    if (!estadisticas) {
        return <Typography variant="h6">Estadísticas no disponibles para este partido</Typography>;
    }

    return (
        <Box padding={5}>
            {/* Información del partido */}
            <Typography variant="h4" gutterBottom>Detalles del Partido</Typography>
            <Typography variant="h5">{`${partido.equipo1} ${partido.resultado} ${partido.equipo2}`}</Typography>
            <Typography variant="body1">Fase: {partido.fase}</Typography>
            <Typography variant="body1">Fecha: {partido.fecha}</Typography>
            <Typography variant="body1">Estadio: {partido.estadio}</Typography>

            {/* Goleadores */}
            {partido.goleadores?.length > 0 && (
                <Box marginTop={4}>
                    <Typography variant="h6" gutterBottom>Goleadores:</Typography>
                    <Grid container spacing={2}>
                        {partido.goleadores.map((goleador, index) => {
                            const playerData = findPlayerData(goleador);
                            return (
                                <Grid item xs={6} sm={12} key={index}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={playerData?.foto || "default.jpg"}
                                            alt={goleador}
                                            sx={{ objectFit: "cover", objectPosition: "top" }}
                                        />
                                        <CardContent>
                                            <Typography variant="body2">{goleador}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            )}

            {/* Estadísticas del partido */}
            <Box marginTop={4}>
                <Typography variant="h6" gutterBottom>Estadísticas:</Typography>
                <Grid container spacing={2}>
                    {/* Equipo 1 */}
                    <Grid item xs={6}>
                        <Typography variant="h6">{partido.equipo1}</Typography>
                        {Object.entries(estadisticas.equipo1).map(([key, value]) => (
                            <Typography variant="body2" key={key}>
                                {`${key}: ${value}`}
                            </Typography>
                        ))}
                    </Grid>
                    {/* Equipo 2 */}
                    <Grid item xs={6}>
                        <Typography variant="h6">{partido.equipo2}</Typography>
                        {Object.entries(estadisticas.equipo2).map(([key, value]) => (
                            <Typography variant="body2" key={key}>
                                {`${key}: ${value}`}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </Box>

            {/* Gráfico de estadísticas */}
            <Box marginTop={4}>
                <Typography variant="h6" gutterBottom>Gráfico de Estadísticas:</Typography>
                <EstadisticasRadar
                    estadisticasEquipo1={estadisticas.equipo1}
                    estadisticasEquipo2={estadisticas.equipo2}
                    equipo1={partido.equipo1}
                    equipo2={partido.equipo2}
                />
            </Box>
        </Box>
    );
};

export default DetallePartido;
