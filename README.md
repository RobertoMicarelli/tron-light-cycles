# 🎮 TRON Light Cycles - Educational Training Arena

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.6%2B-blue.svg)](https://socket.io/)

> Un gioco educativo interattivo ispirato al classico arcade degli anni '80, progettato per sviluppare competenze di decision-making rapido, pensiero strategico e gestione dello stress attraverso il **Ciclo di Apprendimento Esperienziale di David Kolb**.

![TRON Light Cycles](https://img.shields.io/badge/Game-TRON%20Light%20Cycles-00FFFF?style=for-the-badge&logo=gamepad&logoColor=white)

## 🎯 **Demo Live**

🚀 **[Gioca subito online](https://tron-light-cycles-demo.herokuapp.com)** | 📖 **[Guida Rapida](QUICK_START.md)** | 🎓 **[Guida Facilitatore](DEBRIEF_GUIDE.md)**

---

## 🧠 **Obiettivi Formativi**

### Competenze Sviluppate

✅ **Decision-making rapido sotto pressione**  
✅ **Pensiero strategico e anticipatorio**  
✅ **Gestione delle risorse e trade-off**  
✅ **Consapevolezza situazionale**  
✅ **Competizione e negoziazione**  

### 📚 **Framework Pedagogico: Ciclo di Kolb**

1. **Concrete Experience** - Gioco attivo e coinvolgente
2. **Reflective Observation** - Analisi post-round guidata
3. **Abstract Conceptualization** - Collegamento a situazioni reali
4. **Active Experimentation** - Applicazione di nuove strategie

---

## 🎮 **Modalità di Gioco**

### 🌐 **Multiplayer Online**
- ⚡ Matchmaking automatico
- 🎯 Sfida in tempo reale
- 💬 Chat integrata
- 🏆 Best of 3 rounds

### 🎯 **Campaign Progressiva**
- 📊 Livelli crescenti (1→∞ nemici)
- 🤖 AI adattiva e strategica
- 🏅 Sistema di progressione infinita
- 🧠 Debrief formativo integrato

---

## 🚀 **Quick Start**

### Opzione 1: Deploy Online (5 minuti)
```bash
# Su Replit (consigliato)
1. Vai su replit.com
2. "Create Repl" → "Import from GitHub"
3. Incolla URL del repository
4. Click "Run" ▶️
5. Gioca! 🎮
```

### Opzione 2: Deploy Locale
```bash
# Clona il repository
git clone https://github.com/[tuo-username]/tron-light-cycles.git
cd tron-light-cycles

# Installa dipendenze
npm install

# Avvia il server
npm start

# Apri http://localhost:3000
```

---

## 🕹️ **Controlli**

| Azione | Tasto |
|--------|-------|
| **Movimento** | `↑` `↓` `←` `→` |
| **Velocità** | `Z` (↑) / `X` (↓) |
| **Pausa** | `ESC` |

---

## 📁 **Struttura del Progetto**

```
tron-light-cycles/
├── 🎮 game.js              # Logica principale del gioco
├── 🌐 server.js            # Backend Node.js + Socket.io
├── 🎨 style.css            # Stili retro-futuristici
├── 📄 index.html           # Interfaccia utente
├── 📦 package.json         # Dipendenze e script
├── 📚 README.md            # Questa documentazione
├── 🚀 QUICK_START.md       # Guida rapida
├── 🎓 DEBRIEF_GUIDE.md     # Guida per facilitatori
├── 🔧 CUSTOMIZATION_GUIDE.md # Personalizzazione
└── 📤 DEPLOYMENT.md        # Guide di deploy
```

---

## 👨‍🏫 **Utilizzo in Aula**

### Scenario 1: Ice-breaker (15 min)
- **Setup**: Coppie casuali, multiplayer
- **Focus**: Energizzare il gruppo
- **Debrief**: Leggero, focus su divertimento

### Scenario 2: Decision-making Training (45 min)
- **Setup**: Campaign mode individuale
- **Focus**: Analisi decisioni sotto stress
- **Debrief**: Strutturato, collegamento al lavoro

### Scenario 3: Team Building (30 min)
- **Setup**: Torneo a eliminazione
- **Focus**: Dinamiche competitive positive
- **Debrief**: Focus su sportività e collaborazione

---

## 🔧 **Personalizzazione**

### Modifiche Facili
```javascript
// Cambia colori delle moto
let colors = ['#FFD700', '#FF6600', '#FF0099'];

// Regola velocità
case 1: return 8;  // Più lento
case 3: return 3;  // Più veloce

// Modifica round
let maxRounds = 5;  // Invece di 3
```

### Estensioni Avanzate
- 🎁 Sistema power-ups
- 🛡️ Meccaniche shield
- 📊 Leaderboard locale
- 🎥 Sistema replay
- 🤖 AI migliorata

---

## 📊 **Tecnologie**

- **Frontend**: HTML5 Canvas, CSS3, JavaScript ES6+
- **Backend**: Node.js, Express.js
- **Real-time**: Socket.io
- **Styling**: CSS Grid, Flexbox, Animations
- **Audio**: Web Audio API

---

## 🤝 **Contribuire**

Contributi benvenuti! Aree di sviluppo:

- 🎮 Nuove modalità di gioco
- 🎁 Power-ups e varianti
- 🏆 Sistema achievement
- 📊 Dashboard facilitatore
- 📱 Controlli touch mobile
- 🎵 Sistema audio avanzato

### Come Contribuire
1. Fork del repository
2. Crea feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri Pull Request

---

## 📄 **Licenza**

Distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

---

## 🙏 **Credits**

- **Ispirazione**: TRON (1982) - Disney
- **Framework pedagogico**: David Kolb's Experiential Learning Model
- **Sviluppo**: Educational Game Design Team
- **Tecnologie**: Node.js, Socket.io, HTML5 Canvas

---

## 📞 **Supporto**

- 🐛 **Bug Report**: [Crea un issue](https://github.com/[tuo-username]/tron-light-cycles/issues)
- 💡 **Feature Request**: [Suggerisci miglioramenti](https://github.com/[tuo-username]/tron-light-cycles/issues)
- 📧 **Contatto**: [Email del team]

---

## ⭐ **Star il Progetto**

Se questo progetto ti è utile, lascia una ⭐ su GitHub!

---

**🎮 Buon gioco e buona formazione! 🧠**

*"The only way to win is to learn faster than anyone else."* - Eric Ries
