# 🚀 GUIDA AL DEPLOYMENT - TRON Light Cycles

Questa guida fornisce istruzioni passo-passo per pubblicare il gioco su diverse piattaforme di hosting.

---

## 🎯 SCEGLI LA TUA PIATTAFORMA

| Piattaforma | Difficoltà | Tempo Setup | Costo | Consigliato per |
|-------------|------------|-------------|-------|-----------------|
| **Replit** | ⭐ Facile | 5 min | Gratis | Formatori non-tecnici |
| **Glitch** | ⭐ Facile | 5 min | Gratis | Quick prototyping |
| **Railway** | ⭐⭐ Media | 10 min | Gratis/$5 | Produzione leggera |
| **Heroku** | ⭐⭐ Media | 15 min | $7/mese | Produzione standard |
| **DigitalOcean** | ⭐⭐⭐ Difficile | 30 min | $5-10/mese | Produzione professionale |
| **Deploy Locale** | ⭐⭐ Media | 2 min | Gratis | Test e sviluppo |

---

## 🟢 REPLIT (Consigliato per formatori)

### ✅ Vantaggi
- Setup in 5 minuti
- Nessuna configurazione necessaria
- URL pubblico automatico
- Ambiente di sviluppo integrato
- Collaborazione real-time

### 📋 Istruzioni

#### 1. Crea Account
```
1. Vai su https://replit.com
2. Clicca "Sign up" (puoi usare Google/GitHub)
3. Verifica email
```

#### 2. Crea nuovo Repl
```
1. Click "Create Repl"
2. Seleziona "Node.js" come template
3. Nomina il progetto: "tron-light-cycles"
4. Click "Create Repl"
```

#### 3. Carica i file
```
Opzione A - Drag & Drop:
1. Trascina tutti i file nella sidebar di sinistra
2. Aspetta che carichi

Opzione B - Import da GitHub:
1. Click sui 3 puntini vicino "Files"
2. Seleziona "Import from GitHub"
3. Incolla URL del repo
4. Click "Import"
```

#### 4. Installa dipendenze
```
Replit lo fa automaticamente! 
Se necessario, nel terminale:
$ npm install
```

#### 5. Configura il Run
```
1. Click su ".replit" file
2. Verifica che contenga:
   run = "npm start"
   
3. Salva
```

#### 6. Avvia il progetto
```
1. Click sul pulsante verde "Run" in alto
2. Aspetta che il server si avvii
3. Apparirà una finestra con l'anteprima
```

#### 7. Ottieni l'URL pubblico
```
1. Click sull'icona "Open in a new tab" 
2. Copia l'URL dalla barra del browser
3. Format: https://[repl-name].[your-username].repl.co
4. Condividi questo link con i partecipanti!
```

### 🔧 Keep Alive (Importante!)
Replit mette in sleep i progetti gratuiti dopo inattività.

**Soluzione:**
Usa [UptimeRobot](https://uptimerobot.com) per fare ping ogni 5 minuti:
```
1. Registrati su UptimeRobot (gratis)
2. "Add New Monitor"
3. Type: HTTP(s)
4. URL: [il tuo URL Replit]
5. Monitoring Interval: 5 minutes
```

---

## 🎨 GLITCH

### 📋 Istruzioni

#### 1. Crea Account
```
1. Vai su https://glitch.com
2. Sign up con email/GitHub
```

#### 2. Nuovo Progetto
```
1. Click "New Project"
2. Seleziona "glitch-hello-node"
3. Attendi che si crei
```

#### 3. Import da GitHub
```
1. Click su "Tools" (in basso a sinistra)
2. Seleziona "Import and Export"
3. Click "Import from GitHub"
4. Incolla URL del repo: https://github.com/[tuo-username]/tron-light-cycles
5. Click "OK"
```

#### 4. Verifica package.json
```
Glitch installerà automaticamente le dipendenze da package.json
Aspetta che appaia "Installing packages..." e poi "Ready!"
```

#### 5. Ottieni URL
```
1. Click su "Share" (in alto a destra)
2. Copia "Live Site" URL
3. Format: https://[project-name].glitch.me
```

### 💤 Keep Awake
Glitch dorme dopo 5 minuti di inattività.

**Ping automatico:**
Aggiungi al server.js:
```javascript
// Keep Alive per Glitch
setInterval(() => {
    if (process.env.PROJECT_DOMAIN) {
        require('https').get(`https://${process.env.PROJECT_DOMAIN}.glitch.me`);
    }
}, 280000); // Ogni 4.6 minuti
```

---

## 🚂 RAILWAY

### 📋 Istruzioni

#### 1. Crea Account
```
1. Vai su https://railway.app
2. Sign up con GitHub (consigliato)
```

#### 2. Nuovo Progetto
```
1. Click "New Project"
2. Seleziona "Deploy from GitHub repo"
3. Autorizza Railway ad accedere ai tuoi repo
4. Seleziona il repo tron-light-cycles
```

#### 3. Configurazione
```
Railway rileva automaticamente Node.js e:
- Esegue npm install
- Esegue npm start
- Assegna un dominio pubblico
```

#### 4. Variables (Opzionale)
```
1. Click sul progetto
2. "Variables" tab
3. Aggiungi: PORT = 3000
```

#### 5. Ottieni URL
```
1. Click su "Settings"
2. Nella sezione "Domains"
3. Click "Generate Domain"
4. Copia l'URL: https://[project-name].up.railway.app
```

### 💰 Costi
- **Starter Plan:** $5/mese (500 ore esecuzione)
- **Developer Plan:** Gratis inizialmente con $5 credito

---

## 🔵 HEROKU

### 📋 Istruzioni

#### 1. Installa Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Scarica installer: https://devcenter.heroku.com/articles/heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

#### 2. Login
```bash
heroku login
# Premi un tasto per aprire browser e autenticarti
```

#### 3. Crea App
```bash
cd tron-light-cycles
heroku create tron-light-cycles-[tuo-nome]
# Sostituisci [tuo-nome] con qualcosa di unico
```

#### 4. Aggiungi Procfile
Crea un file chiamato `Procfile` (senza estensione):
```
web: node server.js
```

#### 5. Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
# Se usi 'master' invece di 'main':
# git push heroku master
```

#### 6. Apri App
```bash
heroku open
# Oppure vai su: https://[nome-app].herokuapp.com
```

#### 7. Monitora Logs
```bash
heroku logs --tail
```

### 💰 Costi
- **Eco Dynos:** $5/mese (minimo)
- Include: 1000 ore/mese

### 🔧 Aggiorna App
```bash
# Dopo modifiche al codice:
git add .
git commit -m "Aggiornamenti"
git push heroku main
```

---

## 💻 DEPLOY LOCALE (Per test)

### 📋 Istruzioni

#### 1. Clona Repository
```bash
git clone https://github.com/[tuo-username]/tron-light-cycles.git
cd tron-light-cycles
```

#### 2. Installa Dipendenze
```bash
npm install
```

#### 3. Avvia Server
```bash
npm start
```

#### 4. Apri Browser
```
http://localhost:3000
```

### 🌐 Accesso da Rete Locale

Per permettere ad altri dispositivi sulla stessa rete di accedere:

#### 1. Trova il tuo IP locale
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig | findstr IPv4
```

#### 2. Modifica server.js
```javascript
// Cambia questa riga:
http.listen(PORT, () => {

// In questa:
http.listen(PORT, '0.0.0.0', () => {
```

#### 3. Accedi da altri dispositivi
```
http://[TUO-IP-LOCALE]:3000
# Esempio: http://192.168.1.100:3000
```

---

## 🔐 SICUREZZA E BEST PRACTICES

### ✅ Checklist Pre-Deploy

```
□ Rimuovi console.log() di debug
□ Imposta variabili d'ambiente per dati sensibili
□ Abilita HTTPS (la maggior parte delle piattaforme lo fa automaticamente)
□ Limita CORS se necessario
□ Aggiungi rate limiting per prevenire abuse
□ Testa su dispositivi mobile
```

### 🛡️ Rate Limiting

Aggiungi al server.js per prevenire spam:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuti
    max: 100 // max 100 richieste per IP
});

app.use(limiter);
```

Installa dipendenza:
```bash
npm install express-rate-limit
```

---

## 🐛 TROUBLESHOOTING DEPLOY

### ❌ Errore: "Application Error"
**Causa:** Server non si avvia
**Soluzione:**
```bash
# Controlla logs:
heroku logs --tail  # Heroku
railway logs        # Railway

# Verifica che package.json abbia:
"scripts": {
    "start": "node server.js"
}
```

### ❌ Errore: "Cannot find module"
**Causa:** Dipendenze non installate
**Soluzione:**
```bash
npm install
# Verifica package.json sia committato
git add package.json package-lock.json
git commit -m "Fix dependencies"
```

### ❌ Errore: "Port already in use"
**Causa:** Porta 3000 occupata
**Soluzione:**
```bash
# Trova processo sulla porta 3000:
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Killa il processo o usa altra porta
PORT=3001 npm start
```

### ❌ Socket.io non connette
**Causa:** CORS o URL sbagliato
**Soluzione server.js:**
```javascript
const io = require('socket.io')(http, {
    cors: {
        origin: "*", // In produzione, specifica il dominio
        methods: ["GET", "POST"]
    }
});
```

---

## 📊 MONITORAGGIO POST-DEPLOY

### 📈 Metriche da Monitorare

1. **Uptime** - Il server è online?
   - Usa: UptimeRobot, Pingdom
   
2. **Performance** - Quanto è veloce?
   - Usa: Google PageSpeed Insights
   
3. **Errori** - Ci sono crash?
   - Controlla logs della piattaforma
   
4. **Utenti** - Quanti giocatori?
   - Aggiungi Google Analytics (opzionale)

### 🔍 Google Analytics (Opzionale)

Aggiungi a index.html, prima di `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎓 RISORSE EXTRA

### 📚 Documentazione Ufficiale
- [Replit Docs](https://docs.replit.com)
- [Glitch Help](https://glitch.com/help)
- [Railway Docs](https://docs.railway.app)
- [Heroku Dev Center](https://devcenter.heroku.com)

### 🆘 Supporto Comunitario
- [Stack Overflow](https://stackoverflow.com/questions/tagged/node.js)
- [Reddit r/node](https://reddit.com/r/node)
- [Discord Node.js](https://discord.gg/nodejs)

---

**✅ Deployment completato! Il tuo gioco è ora online e pronto per l'uso formativo! 🎮🧠**
