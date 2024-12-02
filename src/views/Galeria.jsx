import { useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Dialog, DialogContent, Box } from "@mui/material";
import { motion } from "framer-motion";
import { jugadoresArgentina } from "../components/jugadores/Argentina";

const Galeria = () => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleOpen = (jugador) => {
        setSelectedPlayer(jugador);
    };

    const handleClose = () => {
        setSelectedPlayer(null);
    };

    return (
        <div>
            <Box 
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <Grid container spacing={4} 
                marginTop= {4}
                sx={{ width: "90%", justifyContent: "center" }}>
                    {jugadoresArgentina.map((jugador, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card onClick={() => handleOpen(jugador)} sx={{ cursor: "pointer", height: "100%" }}>
                                <CardMedia
                                    component="img"
                                    image={jugador.foto}
                                    alt={jugador.nombre}
                                    sx={{ height: 280, objectFit: "cover", objectPosition: "top" }}
                                />
                                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 100 }}>
                                    <Typography variant="h6" component="div" align="center">
                                        {jugador.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {jugador.posicion}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Modal para mostrar detalles del jugador con animación */}
            {selectedPlayer && (
                <Dialog open={Boolean(selectedPlayer)} onClose={handleClose} maxWidth="xs" fullWidth>
                    <DialogContent>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="300" 
                                    image={selectedPlayer.foto}
                                    alt={selectedPlayer.nombre}
                                    sx={{ objectFit: "cover", objectPosition: "top" }}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {selectedPlayer.nombre}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Posición: {selectedPlayer.posicion}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Edad: {selectedPlayer.edad}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Estatura: {selectedPlayer.estatura} cm
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Peso: {selectedPlayer.peso} kg
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Galeria;