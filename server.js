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

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ===========================
// MATCHMAKING SYSTEM
// ===========================

let waitingPlayers = []; // Array di giocatori in attesa di match
let activeRooms = {}; // Stanze attive { roomId: { player1: socket, player2: socket, ... } }

io.on('connection', (socket) => {
    console.log(`✅ Giocatore connesso: ${socket.id}`);
    
    // ===========================
    // FIND MATCH
    // ===========================
    socket.on('findMatch', (playerData) => {
        console.log(`🔍 ${playerData.name} cerca una partita`);
        
        // Aggiungi alla coda
        socket.playerData = playerData;
        socket.playerData.socketId = socket.id;
        
        // Cerca se c'è già un giocatore in attesa
        if (waitingPlayers.length > 0) {
            // Match trovato!
            let opponent = waitingPlayers.shift();
            
            // Crea una nuova stanza
            let roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            // Aggiungi entrambi i giocatori alla stanza
            socket.join(roomId);
            opponent.join(roomId);
            
            // Salva la stanza
            activeRooms[roomId] = {
                player1: socket,
                player2: opponent,
                player1Data: socket.playerData,
                player2Data: opponent.playerData
            };
            
            // Notifica entrambi i giocatori
            socket.emit('matchFound', {
                roomId: roomId,
                isPlayer1: true,
                opponentName: opponent.playerData.name
            });
            
            opponent.emit('matchFound', {
                roomId: roomId,
                isPlayer1: false,
                opponentName: socket.playerData.name
            });
            
            console.log(`🎮 Match creato: ${socket.playerData.name} vs ${opponent.playerData.name}`);
            
        } else {
            // Nessun avversario disponibile, aggiungi alla coda
            waitingPlayers.push(socket);
            
            socket.emit('waitingForOpponent', {
                waitingCount: waitingPlayers.length
            });
            
            console.log(`⏳ ${playerData.name} aggiunto alla coda (${waitingPlayers.length} in attesa)`);
        }
    });
    
    // ===========================
    // CANCEL MATCHMAKING
    // ===========================
    socket.on('cancelMatch', () => {
        waitingPlayers = waitingPlayers.filter(s => s.id !== socket.id);
        console.log(`❌ ${socket.playerData?.name || socket.id} ha annullato la ricerca`);
    });
    
    // ===========================
    // PLAYER MOVE (Sincronizzazione)
    // ===========================
    socket.on('playerMove', (moveData) => {
        let room = activeRooms[moveData.roomId];
        
        if (room) {
            // Invia movimento all'avversario
            let opponent = room.player1.id === socket.id ? room.player2 : room.player1;
            
            opponent.emit('opponentMove', {
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
    // ROUND END
    // ===========================
    socket.on('roundEnd', (data) => {
        let room = activeRooms[data.roomId];
        
        if (room) {
            // Notifica entrambi i giocatori
            io.to(data.roomId).emit('roundEnded', {
                winner: data.winner,
                stats: data.stats
            });
        }
    });
    
    // ===========================
    // DISCONNESSIONE
    // ===========================
    socket.on('disconnect', () => {
        console.log(`❌ Giocatore disconnesso: ${socket.id}`);
        
        // Rimuovi dalla coda di attesa
        waitingPlayers = waitingPlayers.filter(s => s.id !== socket.id);
        
        // Trova e chiudi la stanza attiva
        for (let roomId in activeRooms) {
            let room = activeRooms[roomId];
            
            if (room.player1.id === socket.id || room.player2.id === socket.id) {
                // Notifica l'altro giocatore
                let opponent = room.player1.id === socket.id ? room.player2 : room.player1;
                opponent.emit('opponentDisconnected');
                
                // Rimuovi la stanza
                delete activeRooms[roomId];
                
                console.log(`🚪 Stanza ${roomId} chiusa`);
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
// STATISTICHE SERVER (Debug)
// ===========================
setInterval(() => {
    console.log(`📊 Server Stats:`);
    console.log(`   - Giocatori connessi: ${io.engine.clientsCount}`);
    console.log(`   - In attesa: ${waitingPlayers.length}`);
    console.log(`   - Partite attive: ${Object.keys(activeRooms).length}`);
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
    console.log('🧠 Sistema formativo multiplayer pronto!');
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
