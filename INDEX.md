# 🎮 TRON LIGHT CYCLES - EDUCATIONAL GAME
## 📦 PACCHETTO COMPLETO FORMATIVO

---

## 🎯 COSA HAI RICEVUTO

Hai ricevuto un **gioco educativo completo e funzionante** con:

✅ **Modalità Multiplayer Online** - 2 giocatori in tempo reale  
✅ **Modalità Campaign Progressiva** - AI che aumenta di difficoltà  
✅ **Sistema di login e matchmaking**  
✅ **Backend Node.js + Socket.io**  
✅ **Design retro-futuristico neon**  
✅ **Framework pedagogico Kolb integrato**  
✅ **Guide complete per facilitatori**  

---

## 📁 STRUTTURA FILE

### 🎮 FILE DI GIOCO (Core)

#### 1. **index.html** 
Il file HTML principale con tutte le schermate del gioco.

**Contiene:**
- Schermata login
- Selezione modalità
- Matchmaking
- Canvas di gioco
- HUD completo
- Schermate round/game over

---

#### 2. **style.css**
Tutti gli stili visivi del gioco con effetti neon.

**Features:**
- Effetti glow e neon
- Animazioni CSS
- Grid background animato
- Design responsive
- Tema retro-futuristico

---

#### 3. **game.js** ⭐ (File principale)
Tutta la logica del gioco (1000+ righe).

**Contiene:**
- Classe `Bike` con AI
- Sistema di collisioni
- Game loop (60 FPS)
- Gestione input
- Multiplayer sync
- Sistema di livelli progressivi
- AI adattiva

**💡 Funzioni chiave:**
```javascript
class Bike              // Moto con AI
startGame()            // Avvia partita
update()               // Game loop
checkCollisions()      // Rileva crash
aiDecide()             // AI decision-making
```

---

#### 4. **server.js**
Backend Node.js per multiplayer online.

**Gestisce:**
- Connessioni Socket.io
- Matchmaking automatico
- Sincronizzazione real-time
- Gestione stanze di gioco
- Disconnessioni

**🔌 Eventi Socket.io:**
```javascript
'findMatch'              // Cerca avversario
'matchFound'             // Match trovato
'playerMove'             // Sincronizza movimento
'opponentDisconnected'   // Gestisci disconnessione
```

---

#### 5. **package.json**
Configurazione dipendenze Node.js.

**Dipendenze:**
- `express` - Web server
- `socket.io` - Real-time communication

**Script:**
```bash
npm start    # Avvia server produzione
npm run dev  # Avvia con auto-reload
```

---

### 📚 DOCUMENTAZIONE

#### 6. **README.md** ⭐ (Documento Master)
Documentazione completa del progetto (300+ righe).

**Sezioni:**
- 🧠 Obiettivi formativi dettagliati
- 📚 Collegamento al Ciclo di Kolb
- 🎮 Modalità di gioco
- 🕹️ Controlli
- 📤 Deploy su 4 piattaforme
- 👨‍🏫 Guida per facilitatori
- 💬 Domande per debrief
- 🔧 Personalizzazione
- 🛡️ Troubleshooting

**👉 INIZIA DA QUI!**

---

#### 7. **QUICK_START.md**
Guida rapida per iniziare in 5 minuti.

**Percorsi:**
- 🚀 Deploy online (Replit/Glitch)
- 💻 Test locale
- 🎮 Come giocare
- 🧠 Uso in aula

**Per:** Formatori che vogliono testare subito.

---

#### 8. **DEPLOYMENT.md**
Guida dettagliata al deploy (100+ righe).

**Piattaforme coperte:**
- ⭐ Replit (consigliato)
- 🎨 Glitch
- 🚂 Railway
- 🔵 Heroku
- 🌊 DigitalOcean
- 💻 Deploy locale

**Include:**
- Istruzioni step-by-step
- Screenshot e comandi
- Troubleshooting specifico
- Costi e comparazioni

---

#### 9. **DEBRIEF_GUIDE.md** ⭐⭐⭐ (Fondamentale!)
Scheda completa per il debrief formativo (200+ righe).

**Struttura:**
- 📋 Template struttura debrief (20-30 min)
- 🔄 Domande per ogni fase Kolb
- 💡 Tips per facilitatore
- 🎭 Varianti di debrief
- 📊 Scheda osservazione
- 📈 Metriche di successo

**👉 STAMPABILE e pronto all'uso!**

---

#### 10. **CUSTOMIZATION_GUIDE.md**
Guida per estendere il gioco (300+ righe).

**Modifiche facili:**
- 🎨 Cambia colori
- ⚡ Regola difficoltà
- 📏 Dimensioni griglia
- 🏆 Numero round

**Estensioni avanzate:**
- 🎁 Power-ups system
- 🛡️ Shield mechanics
- 📊 Leaderboard locale
- 🎥 Replay system
- 🎵 Sound effects
- 🤖 AI migliorata
- 📈 Analytics tracking

**Include codice completo copiabile!**

---

### 🔧 FILE TECNICI

#### 11. **.gitignore**
Esclude file non necessari dal repository.

**Esclude:**
- `node_modules/`
- `.env`
- File IDE
- Logs

---

## 🚀 COME INIZIARE

### 🎯 Percorso consigliato per FORMATORI:

```
1️⃣ Leggi README.md (15 min)
   └─> Comprendi obiettivi formativi e ciclo Kolb

2️⃣ Segui QUICK_START.md (5 min)
   └─> Deploya su Replit e testa

3️⃣ Gioca 2-3 partite (10 min)
   └─> Sperimenta entrambe le modalità

4️⃣ Studia DEBRIEF_GUIDE.md (10 min)
   └─> Prepara domande per la tua sessione

5️⃣ Conduci prima sessione formativa! 🎉
```

### 🎯 Percorso consigliato per SVILUPPATORI:

```
1️⃣ Leggi README.md (10 min)
   └─> Overview tecnica

2️⃣ Setup locale (5 min)
   └─> npm install && npm start

3️⃣ Esplora il codice (30 min)
   └─> Parti da game.js → Bike class

4️⃣ Leggi CUSTOMIZATION_GUIDE.md (15 min)
   └─> Scopri estensioni possibili

5️⃣ Implementa la tua feature! 💻
```

---

## 🎮 MODALITÀ DI GIOCO

### 🌐 MULTIPLAYER ONLINE
**Come funziona:**
1. Due giocatori fanno login
2. Sistema matchmaking li abbina
3. Giocano insieme in tempo reale
4. Entrambi usano le frecce direzionali
5. Best of 3 rounds

**Obiettivo formativo:** Competizione, lettura avversario, negoziazione

---

### 🎯 CAMPAIGN PROGRESSIVA
**Come funziona:**
1. Giochi contro CPU
2. Livello 1: vs 1 nemico
3. Livello 2: vs 2 nemici
4. Livello 3: vs 3 nemici
5. Livello 4+: +1 nemico ogni 2 livelli

**Esempio progressione:**
```
Livello 1  →  1 nemico
Livello 2  →  2 nemici
Livello 3  →  3 nemici
Livello 4  →  3 nemici
Livello 5  →  3 nemici
Livello 6  →  4 nemici
Livello 7  →  4 nemici
Livello 8  →  5 nemici
...
```

**Obiettivo formativo:** Gestione complessità crescente, pensiero strategico

---

## 🎓 FRAMEWORK PEDAGOGICO

### 📚 Ciclo di Kolb Integrato

Il gioco è progettato attorno al modello di **David Kolb**:

#### 1️⃣ CONCRETE EXPERIENCE
**Nel gioco:** Pilotare la moto, sentire lo stress, prendere decisioni

**Durata:** 10-15 minuti di gioco

---

#### 2️⃣ REFLECTIVE OBSERVATION  
**Nel debrief:** Osservare pattern, riflettere su errori

**Domande chiave:**
- "Cosa hai sentito quando..."
- "Quando hai commesso errori..."
- "Hai notato pattern..."

**Durata:** 5-10 minuti

---

#### 3️⃣ ABSTRACT CONCEPTUALIZATION
**Nel debrief:** Generalizzare principi, collegare al lavoro

**Domande chiave:**
- "La scia cosa rappresenta nel tuo lavoro?"
- "Il trade-off velocità/controllo dove lo ritrovi?"
- "Quali competenze sono trasferibili?"

**Durata:** 10-15 minuti

---

#### 4️⃣ ACTIVE EXPERIMENTATION
**Applicazione:** Nuove strategie nel round successivo o nel lavoro

**Domande chiave:**
- "Cosa farai diversamente?"
- "Come applicherai questo nel tuo lavoro?"
- "Qual è la prima azione concreta?"

**Durata:** 5 minuti + follow-up futuro

---

## 🔌 DEPLOY RAPIDO

### ⚡ Su Replit (5 minuti):

```
1. Vai su replit.com
2. Sign up (gratis)
3. "Create Repl" → "Import from GitHub"
4. Incolla URL del tuo repo
5. Click "Run" ▶️
6. Copia URL pubblico
7. FATTO! 🎉
```

### 💻 In Locale (2 minuti):

```bash
cd tron-light-cycles
npm install
npm start
# Apri: http://localhost:3000
```

---

## 🎯 CASI D'USO FORMATIVI

### 1️⃣ Ice-Breaker (15 min)
- **Setup:** Coppie casuali, multiplayer
- **Focus:** Energizzare gruppo
- **Debrief:** Leggero, focus su divertimento

### 2️⃣ Decision-Making Training (45 min)
- **Setup:** Campaign mode individuale
- **Focus:** Analisi decisioni sotto stress
- **Debrief:** Strutturato, collegamento al lavoro

### 3️⃣ Team Building (30 min)
- **Setup:** Torneo a eliminazione
- **Focus:** Dinamiche competitive positive
- **Debrief:** Focus su sportività e collaboration

### 4️⃣ Leadership Development (60 min)
- **Setup:** Osservatori + giocatori
- **Focus:** Stili decisionali, gestione pressione
- **Debrief:** Profondo, con feedback 360°

---

## 📊 COMPETENZE SVILUPPATE

✅ **Decision-making rapido**  
✅ **Pensiero strategico**  
✅ **Gestione dello stress**  
✅ **Consapevolezza situazionale**  
✅ **Autoregolazione**  
✅ **Gestione risorse scarse**  
✅ **Anticipazione e pianificazione**  
✅ **Resilienza**  

---

## 🆘 SUPPORTO

### ❓ Domande Frequenti

**Q: Il gioco funziona offline?**
A: La modalità Campaign sì, Multiplayer richiede server online.

**Q: Quanti giocatori contemporaneamente?**
A: Multiplayer: 2 giocatori. Campaign: 1 giocatore vs CPU.

**Q: Posso personalizzare i colori?**
A: Sì! Vedi CUSTOMIZATION_GUIDE.md

**Q: Funziona su tablet/smartphone?**
A: Sì, responsive design. Controlli touch in development.

**Q: Quanto dura una sessione formativa?**
A: 15-60 minuti (gioco + debrief).

**Q: Posso usarlo in contesti aziendali?**
A: Sì! Licenza MIT, libero uso commerciale.

---

## 🎨 PERSONALIZZAZIONE RAPIDA

### Cambia colori (1 min):
```javascript
// game.js, riga ~360
let colors = ['#TUO_COLORE_1', '#TUO_COLORE_2', ...];
```

### Regola difficoltà (1 min):
```javascript
// game.js, riga ~115
case 1: return 10;  // Più facile
case 3: return 2;   // Più difficile
```

### Più round (1 min):
```javascript
// game.js, riga ~34
let maxRounds = 5;  // Invece di 3
```

---

## 📈 ROADMAP FUTURE

### 🚀 Prossime Features (Opzionali)

- [ ] Power-ups system
- [ ] Modalità team (2v2)
- [ ] Replay video
- [ ] Achievement system
- [ ] Integrazione LMS/SCORM
- [ ] Mobile touch controls
- [ ] Modalità training guidata
- [ ] Dashboard analytics facilitatore

**Vuoi contribuire? Pull request benvenute!**

---

## 📚 RISORSE AGGIUNTIVE

### 📖 Libri Consigliati:
- Kolb, D.A. (1984). "Experiential Learning"
- Csikszentmihalyi, M. (1990). "Flow"
- Koster, R. (2004). "A Theory of Fun"

### 🔗 Link Utili:
- [Kolb Learning Model](https://www.simplypsychology.org/learning-kolb.html)
- [Gamification in Education](https://www.teachthought.com/learning/gamification-education/)
- [Socket.io Docs](https://socket.io/docs/)

---

## 🙏 CREDITS

**Framework:** David Kolb's Experiential Learning Model  
**Ispirazione:** TRON (1982) - Disney  
**Tecnologie:** Node.js, Socket.io, HTML5 Canvas  
**Licenza:** MIT (uso libero)  

---

## ✅ CHECKLIST FINALE

Prima di usare il gioco in sessione formativa:

- [ ] Ho letto README.md
- [ ] Ho testato il gioco (almeno 2 partite)
- [ ] Ho preparato domande debrief
- [ ] Ho fatto deploy online (se necessario)
- [ ] Ho testato l'URL con un collega
- [ ] Ho stampato DEBRIEF_GUIDE.md
- [ ] Ho definito obiettivi formativi specifici
- [ ] Ho preparato follow-up post-sessione

---

## 🎮 PRONTO A INIZIARE!

**Hai tutto quello che ti serve per:**
1. ✅ Deployare il gioco online
2. ✅ Usarlo in sessioni formative
3. ✅ Condurre debrief strutturati
4. ✅ Personalizzarlo per le tue esigenze
5. ✅ Estenderlo con nuove features

---

**🚀 Che la Griglia sia con te! 🎯**

*Buon gaming formativo!* 🧠💡

---

📅 **Versione:** 1.0.0  
📧 **Supporto:** Crea issue su GitHub  
⭐ **Star il progetto** se ti è utile!
