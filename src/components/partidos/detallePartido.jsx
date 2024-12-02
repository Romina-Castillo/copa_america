import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { partidos } from "./partidos";
import { jugadoresArgentina } from "../jugadores/Argentina";
import { EstadisticasRadar } from "../grafico/grafico";

const DetallePartido = () => {
    const { id } = useParams();
    const partidoId = parseInt(id, 10); // Validación de ID
    const partido = partidos.find((p) => p.id === partidoId);
    const findPlayerData = (nombre) => jugadoresArgentina.find((jugador) => jugador.nombre === nombre);

    const [selectedPlayer, setSelectedPlayer] = useState(null); // Estado para el jugador seleccionado
    const [dialogOpen, setDialogOpen] = useState(false); // Estado para abrir/cerrar el diálogo

    // Validar si el partido existe
    if (isNaN(partidoId) || !partido) {
        return <Typography variant="h6">Partido no encontrado</Typography>;
    }

    const estadisticas = partido.estadisticas;

    const getTeamImage = (teamName) => `/img/selecciones/${teamName.toLowerCase().replace(/\s+/g, "_")}.png`;

    // Validar si las estadísticas están disponibles
    if (!estadisticas) {
        return <Typography variant="h6">Estadísticas no disponibles para este partido</Typography>;
    }

    // Abrir diálogo con estadísticas del jugador
    const handlePlayerClick = (nombre) => {
        const player = findPlayerData(nombre);
        if (player) {
            setSelectedPlayer(player);
            setDialogOpen(true);
        }
    };

    return (
        <Box padding={5} 
        sx={{ width: "100%", margin: 5 }}>
            {/* Información del partido */}
            <Typography variant="h4" gutterBottom>Detalles del Partido</Typography>
            <Grid container alignItems="center" justifyContent="space-between" marginBottom={2}>
                {/* Imagen equipo 1 */}
                <Grid item xs={4}>
                    <CardMedia
                        component="img"
                        height="60"
                        image={getTeamImage(partido.equipo1)}
                        alt={partido.equipo1}
                        sx={{ objectFit: "contain" }}
                    />
                </Grid>

                <Grid item xs={4} textAlign="center">
                    <Typography variant="h5">{`${partido.equipo1} ${partido.resultado} ${partido.equipo2}`}</Typography>
                </Grid>

                {/* Imagen equipo 2 */}
                <Grid item xs={4}>
                    <CardMedia
                        component="img"
                        height="60"
                        image={getTeamImage(partido.equipo2)}
                        alt={partido.equipo2}
                        sx={{ objectFit: "contain" }}
                    />
                </Grid>
            </Grid>

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
                                <Grid item xs={6} sm={4} key={index}>
                                    <Card onClick={() => handlePlayerClick(goleador)} sx={{ cursor: "pointer" }}>
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
<Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
    <Box sx={{ width: "500px", height: "500px" }}> {/* Ajusta el tamaño aquí */}
        <EstadisticasRadar
            estadisticasEquipo1={estadisticas.equipo1}
            estadisticasEquipo2={estadisticas.equipo2}
            equipo1={partido.equipo1}
            equipo2={partido.equipo2}
        />
    </Box>
</Grid>

            {/* Diálogo con estadísticas del jugador */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Estadísticas de {selectedPlayer?.nombre}</DialogTitle>
                <DialogContent>
                    {selectedPlayer && (
                        <>
                            <Typography variant="body1">Posición: {selectedPlayer.posicion}</Typography>
                            <Typography variant="body1">Edad: {selectedPlayer.edad}</Typography>
                            <Typography variant="body1">Estatura: {selectedPlayer.estatura} cm</Typography>
                            <Typography variant="body1">Peso: {selectedPlayer.peso} kg</Typography>
                            <Typography variant="body1">Partidos jugados: {selectedPlayer.partidos}</Typography>
                            <Typography variant="body1">Goles: {selectedPlayer.goles}</Typography>
                            <Typography variant="body1">Asistencias: {selectedPlayer.asistencias}</Typography>
                            <Typography variant="body1">Tarjetas Amarillas: {selectedPlayer.tarjetasAmarillas}</Typography>
                            <Typography variant="body1">Tarjetas Rojas: {selectedPlayer.tarjetasRojas}</Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DetallePartido;
