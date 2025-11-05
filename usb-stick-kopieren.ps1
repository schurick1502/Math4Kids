# PowerShell Skript: Kopfrechnen-App auf USB-Stick kopieren
# Einfach doppelklicken oder mit PowerShell ausführen

Write-Host "╔═══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Kopfrechnen-App auf USB-Stick kopieren    ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Prüfe ob dist-Ordner existiert
if (-not (Test-Path "dist")) {
    Write-Host "❌ Fehler: dist-Ordner nicht gefunden!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Bitte zuerst den Build erstellen:" -ForegroundColor Yellow
    Write-Host "  npm run build" -ForegroundColor White
    Write-Host ""
    Pause
    exit
}

Write-Host "✅ dist-Ordner gefunden!" -ForegroundColor Green
Write-Host ""

# Zeige verfügbare Laufwerke
Write-Host "📀 Verfügbare Laufwerke:" -ForegroundColor Cyan
Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Used -ne $null -and $_.Name -match '^[D-Z]$' } | ForEach-Object {
    $size = [math]::Round($_.Used / 1GB, 2)
    $free = [math]::Round($_.Free / 1GB, 2)
    Write-Host "   $($_.Name):\ - Belegt: $size GB, Frei: $free GB" -ForegroundColor White
}
Write-Host ""

# Frage nach USB-Stick Laufwerk
Write-Host "💾 Welches Laufwerk ist dein USB-Stick?" -ForegroundColor Yellow
Write-Host "   (z.B. E, F, G, etc.)" -ForegroundColor Gray
$drive = Read-Host "   Laufwerksbuchstabe"

# Validiere Eingabe
if (-not $drive -or $drive.Length -eq 0) {
    Write-Host ""
    Write-Host "❌ Keine Eingabe! Abbruch." -ForegroundColor Red
    Pause
    exit
}

# Entferne :\ falls angegeben
$drive = $drive.TrimEnd(':', '\').ToUpper()

# Prüfe ob Laufwerk existiert
if (-not (Test-Path "${drive}:\")) {
    Write-Host ""
    Write-Host "❌ Laufwerk ${drive}:\ nicht gefunden!" -ForegroundColor Red
    Pause
    exit
}

Write-Host ""
Write-Host "🎯 Ziel: ${drive}:\Kopfrechnen-App\" -ForegroundColor Cyan

# Erstelle Zielordner
$targetPath = "${drive}:\Kopfrechnen-App"

Write-Host ""
Write-Host "📂 Erstelle Ordner auf USB-Stick..." -ForegroundColor Yellow

try {
    if (Test-Path $targetPath) {
        Write-Host "   ⚠️  Ordner existiert bereits. Wird überschrieben..." -ForegroundColor Yellow
        Remove-Item -Path $targetPath -Recurse -Force
    }
    
    New-Item -Path $targetPath -ItemType Directory -Force | Out-Null
    Write-Host "   ✅ Ordner erstellt!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Fehler beim Erstellen des Ordners: $_" -ForegroundColor Red
    Pause
    exit
}

Write-Host ""
Write-Host "📦 Kopiere Dateien..." -ForegroundColor Yellow

try {
    # Kopiere alle Dateien aus dist
    Copy-Item -Path "dist\*" -Destination $targetPath -Recurse -Force
    
    Write-Host "   ✅ Dateien kopiert!" -ForegroundColor Green
    
    # Zähle Dateien
    $fileCount = (Get-ChildItem -Path $targetPath -Recurse -File).Count
    Write-Host "   📄 $fileCount Dateien übertragen" -ForegroundColor White
    
} catch {
    Write-Host "   ❌ Fehler beim Kopieren: $_" -ForegroundColor Red
    Pause
    exit
}

# Erstelle Readme-Datei auf dem Stick
$readmeContent = @"
╔═══════════════════════════════════════════════╗
║      Kopfrechnen-Spaß PWA                    ║
║      Rechnen lernen mit Spaß!                ║
╚═══════════════════════════════════════════════╝

📱 SO STARTEST DU DIE APP AUF DEINEM SMARTPHONE:

ANDROID:
--------
1. USB-Stick ins Smartphone stecken (mit OTG-Adapter)
2. "Dateien"-App öffnen
3. Zum USB-Stick navigieren
4. Ordner "Kopfrechnen-App" öffnen
5. Datei "index.html" antippen
6. "Mit Chrome öffnen" wählen
7. Fertig! 🎉

ALS APP INSTALLIEREN (empfohlen):
----------------------------------
1. App wie oben öffnen
2. Im Browser: Menü (⋮) → "Zum Startbildschirm hinzufügen"
3. Jetzt als richtige App verfügbar!
4. USB-Stick kann entfernt werden

IPHONE/IPAD:
------------
1. USB-Stick mit Lightning-Adapter anschließen
2. "Dateien"-App öffnen
3. "index.html" öffnen
4. Mit Safari öffnen
5. Teilen-Button → "Zum Home-Bildschirm"

💡 TIPP: Nach der Installation als PWA brauchst du den
         USB-Stick nicht mehr und die App funktioniert offline!

📚 Mehr Infos: Siehe USB-STICK-ANLEITUNG.md im Projektordner

Viel Spaß beim Rechnen! 🎯✨
"@

try {
    $readmeContent | Out-File -FilePath "$targetPath\START-ANLEITUNG.txt" -Encoding UTF8
    Write-Host ""
    Write-Host "   ℹ️  START-ANLEITUNG.txt erstellt" -ForegroundColor Cyan
} catch {
    # Nicht kritisch, wenn das fehlschlägt
}

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║            ✅ ERFOLGREICH! ✅                 ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📂 Dateien wurden kopiert nach:" -ForegroundColor White
Write-Host "   ${drive}:\Kopfrechnen-App\" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Nächste Schritte:" -ForegroundColor Yellow
Write-Host "   1. USB-Stick sicher entfernen (Hardware sicher entfernen)" -ForegroundColor White
Write-Host "   2. USB-Stick ins Smartphone stecken" -ForegroundColor White
Write-Host "   3. START-ANLEITUNG.txt lesen" -ForegroundColor White
Write-Host "   4. index.html mit Browser öffnen" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tipp: Installiere die App als PWA für beste Erfahrung!" -ForegroundColor Cyan
Write-Host ""

# Öffne USB-Stick im Explorer
$openExplorer = Read-Host "Möchtest du den USB-Stick im Explorer öffnen? (j/n)"
if ($openExplorer -eq "j" -or $openExplorer -eq "J") {
    Start-Process "explorer.exe" -ArgumentList $targetPath
}

Write-Host ""
Write-Host "Fertig! Du kannst dieses Fenster schließen." -ForegroundColor Green
Write-Host ""
Pause



