/* ===========================
   TRON LIGHT CYCLES - SERVER
   Backend Node.js + Socket.io
   Gestisce matchmaking e sincronizzazione real-time
   =========================== */

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const PORT = process.env.PORT || 3000;

// Serve file statici
app.use(express.static(path.join(__dirname)));

// Serve file audio dalla cartella assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ===========================
// MATCHMAKING SYSTEM - MULTIPLAYER AVANZATO
// ===========================

let waitingPlayers = []; // Array di giocatori in attesa di match
let activeRooms = {}; // Stanze attive { roomId: { players: [], gameState: {}, ... } }

// Configurazione partite per numero di giocatori
const GAME_CONFIG = {
    2: { maxRounds: 5, requiredWins: 3, name: "Duello" },
    3: { maxRounds: 7, requiredWins: 3, name: "Triangolo" },
    4: { maxRounds: 10, requiredWins: 3, name: "Quadrato" }
};

io.on('connection', (socket) => {
    console.log(`✅ Giocatore connesso: ${socket.id}`);
    
    // ===========================
    // FIND MATCH - MULTIPLAYER AVANZATO
    // ===========================
    socket.on('findMatch', (playerData) => {
        console.log(`🔍 ${playerData.name} cerca una partita (${playerData.preferredPlayers || 2} giocatori)`);
        
        // Aggiungi alla coda
        socket.playerData = playerData;
        socket.playerData.socketId = socket.id;
        socket.playerData.preferredPlayers = playerData.preferredPlayers || 2;
        
        // Cerca se c'è già una stanza in attesa con lo stesso numero di giocatori
        let targetPlayers = socket.playerData.preferredPlayers;
        let availableRoom = null;
        
        // Cerca stanza esistente con spazio
        for (let roomId in activeRooms) {
            let room = activeRooms[roomId];
            if (room.players.length < targetPlayers && room.players.length > 0) {
                availableRoom = room;
                break;
            }
        }
        
        if (availableRoom) {
            // Unisciti a stanza esistente
            socket.join(availableRoom.roomId);
            availableRoom.players.push(socket);
            
            // Notifica tutti i giocatori nella stanza
            io.to(availableRoom.roomId).emit('playerJoined', {
                roomId: availableRoom.roomId,
                playerName: playerData.name,
                playerCount: availableRoom.players.length,
                totalPlayers: targetPlayers
            });
            
            console.log(`👥 ${playerData.name} si è unito alla stanza ${availableRoom.roomId} (${availableRoom.players.length}/${targetPlayers})`);
            
            // Se la stanza è piena, inizia la partita
            if (availableRoom.players.length === targetPlayers) {
                startMultiplayerGame(availableRoom);
            }
            
        } else {
            // Crea nuova stanza
            let roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            socket.join(roomId);
            
            // Crea stanza
            activeRooms[roomId] = {
                roomId: roomId,
                players: [socket],
                gameState: {
                    currentRound: 1,
                    maxRounds: GAME_CONFIG[targetPlayers].maxRounds,
                    requiredWins: GAME_CONFIG[targetPlayers].requiredWins,
                    gameType: GAME_CONFIG[targetPlayers].name,
                    scores: {},
                    cpuRound: 0 // Contatore per CPU aggiuntive
                }
            };
            
            socket.emit('roomCreated', {
                roomId: roomId,
                playerCount: 1,
                totalPlayers: targetPlayers,
                gameConfig: GAME_CONFIG[targetPlayers]
            });
            
            console.log(`🏠 Nuova stanza creata: ${roomId} (${targetPlayers} giocatori)`);
        }
    });
    
    // ===========================
    // CANCEL MATCHMAKING
    // ===========================
    socket.on('cancelMatch', () => {
        // Rimuovi da tutte le stanze
        for (let roomId in activeRooms) {
            let room = activeRooms[roomId];
            room.players = room.players.filter(p => p.id !== socket.id);
            
            if (room.players.length === 0) {
                delete activeRooms[roomId];
                console.log(`🚪 Stanza ${roomId} chiusa (nessun giocatore)`);
            } else {
                // Notifica altri giocatori
                io.to(roomId).emit('playerLeft', {
                    playerName: socket.playerData?.name || socket.id,
                    remainingPlayers: room.players.length
                });
            }
        }
        
        console.log(`❌ ${socket.playerData?.name || socket.id} ha annullato la ricerca`);
    });
    
    // ===========================
    // PLAYER MOVE (Sincronizzazione Multiplayer)
    // ===========================
    socket.on('playerMove', (moveData) => {
        let room = activeRooms[moveData.roomId];
        
        if (room) {
            // Invia movimento a tutti gli altri giocatori nella stanza
            socket.to(moveData.roomId).emit('opponentMove', {
                playerId: socket.id,
                playerName: socket.playerData.name,
                x: moveData.x,
                y: moveData.y,
                direction: moveData.direction,
                speed: moveData.speed,
                trail: moveData.trail,
                alive: moveData.alive
            });
        }
    });
    
    // ===========================
    // ROUND END - MULTIPLAYER
    // ===========================
    socket.on('roundEnd', (data) => {
        let room = activeRooms[data.roomId];
        
        if (room) {
            // Aggiorna punteggi
            if (!room.gameState.scores[data.winner.playerId]) {
                room.gameState.scores[data.winner.playerId] = 0;
            }
            room.gameState.scores[data.winner.playerId]++;
            
            // Controlla se qualcuno ha vinto
            let winner = null;
            for (let playerId in room.gameState.scores) {
                if (room.gameState.scores[playerId] >= room.gameState.requiredWins) {
                    winner = playerId;
                    break;
                }
            }
            
            if (winner) {
                // Partita finita!
                io.to(data.roomId).emit('gameEnded', {
                    winner: winner,
                    finalScores: room.gameState.scores,
                    totalRounds: room.gameState.currentRound
                });
                
                // Rimuovi stanza
                delete activeRooms[data.roomId];
                console.log(`🏆 Partita finita in stanza ${data.roomId}. Vincitore: ${winner}`);
                
            } else {
                // Continua al prossimo round
                room.gameState.currentRound++;
                
                // Controlla se aggiungere CPU (ogni 3 round)
                let addCPU = (room.gameState.currentRound % 3 === 0);
                
                io.to(data.roomId).emit('roundEnded', {
                    winner: data.winner,
                    stats: data.stats,
                    currentRound: room.gameState.currentRound,
                    maxRounds: room.gameState.maxRounds,
                    scores: room.gameState.scores,
                    addCPU: addCPU
                });
                
                console.log(`🎮 Round ${room.gameState.currentRound - 1} completato in stanza ${data.roomId}${addCPU ? ' (CPU aggiuntiva!)' : ''}`);
            }
        }
    });
    
    // ===========================
    // DISCONNESSIONE - MULTIPLAYER
    // ===========================
    socket.on('disconnect', () => {
        console.log(`❌ Giocatore disconnesso: ${socket.id}`);
        
        // Trova e gestisci la stanza attiva
        for (let roomId in activeRooms) {
            let room = activeRooms[roomId];
            let playerIndex = room.players.findIndex(p => p.id === socket.id);
            
            if (playerIndex !== -1) {
                // Rimuovi giocatore dalla stanza
                room.players.splice(playerIndex, 1);
                
                if (room.players.length === 0) {
                    // Nessun giocatore rimasto, chiudi stanza
                    delete activeRooms[roomId];
                    console.log(`🚪 Stanza ${roomId} chiusa (nessun giocatore)`);
                } else {
                    // Notifica altri giocatori
                    io.to(roomId).emit('playerDisconnected', {
                        playerName: socket.playerData?.name || socket.id,
                        remainingPlayers: room.players.length
                    });
                    console.log(`👥 Giocatore rimosso dalla stanza ${roomId} (${room.players.length} rimasti)`);
                }
                break;
            }
        }
    });
    
    // ===========================
    // CHAT (Opzionale - per estensioni future)
    // ===========================
    socket.on('chatMessage', (data) => {
        let room = activeRooms[data.roomId];
        if (room) {
            io.to(data.roomId).emit('chatMessage', {
                sender: socket.playerData.name,
                message: data.message,
                timestamp: Date.now()
            });
        }
    });
});

// ===========================
// FUNZIONI HELPER
// ===========================

function startMultiplayerGame(room) {
    console.log(`🚀 Iniziando partita multiplayer in stanza ${room.roomId}`);
    
    // Inizializza punteggi per tutti i giocatori
    room.players.forEach(player => {
        room.gameState.scores[player.id] = 0;
    });
    
    // Notifica tutti i giocatori che la partita inizia
    io.to(room.roomId).emit('gameStarted', {
        roomId: room.roomId,
        players: room.players.map(p => ({
            id: p.id,
            name: p.playerData.name
        })),
        gameConfig: {
            maxRounds: room.gameState.maxRounds,
            requiredWins: room.gameState.requiredWins,
            gameType: room.gameState.gameType
        }
    });
    
    console.log(`🎮 Partita iniziata: ${room.players.map(p => p.playerData.name).join(' vs ')}`);
}

// ===========================
// STATISTICHE SERVER (Debug)
// ===========================
setInterval(() => {
    let totalPlayersInRooms = 0;
    let roomStats = {};
    
    for (let roomId in activeRooms) {
        let room = activeRooms[roomId];
        totalPlayersInRooms += room.players.length;
        
        let playerCount = room.players.length;
        if (!roomStats[playerCount]) roomStats[playerCount] = 0;
        roomStats[playerCount]++;
    }
    
    console.log(`📊 Server Stats:`);
    console.log(`   - Giocatori connessi: ${io.engine.clientsCount}`);
    console.log(`   - In stanze: ${totalPlayersInRooms}`);
    console.log(`   - Partite attive: ${Object.keys(activeRooms).length}`);
    
    if (Object.keys(roomStats).length > 0) {
        console.log(`   - Stanze per giocatori:`, roomStats);
    }
}, 30000); // Ogni 30 secondi

// ===========================
// AVVIO SERVER
// ===========================
http.listen(PORT, () => {
    console.log('🎮 ===================================');
    console.log('🎮 TRON LIGHT CYCLES - SERVER ATTIVO');
    console.log('🎮 ===================================');
    console.log(`🌐 Server in ascolto su porta: ${PORT}`);
    console.log(`🔗 URL locale: http://localhost:${PORT}`);
    console.log('🧠 Sistema formativo multiplayer avanzato pronto!');
    console.log('👥 Supporta 2-4 giocatori simultanei');
    console.log('🤖 CPU aggiuntive ogni 3 round');
    console.log('🎮 ===================================');
});

// ===========================
// GESTIONE ERRORI
// ===========================
process.on('uncaughtException', (error) => {
    console.error('❌ Errore non gestito:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise rejection non gestita:', reason);
});
