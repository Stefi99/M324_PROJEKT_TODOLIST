# Testbericht Systemtests

## Ziel

Ziel der Systemtests war es, zentrale Funktionen der Todo-App aus Benutzersicht zu prüfen. Dabei wurde getestet, ob ein Benutzer Todos erstellen, erledigen und löschen kann.

## Testumgebung

Die Tests wurden im Frontend mit Jest und React Testing Library umgesetzt.

Ausgeführt wurden die Tests mit:

```bash
npm test
```

---

## Automatisierte Systemtests

### 1. Todo hinzufügen

**Ziel:**
Es wird geprüft, ob ein neues Todo hinzugefügt wird, wenn der Benutzer einen Text eingibt und auf "Absenden" klickt.

**Vorgehen:**
Der Benutzer gibt "Mathe lernen" in das Eingabefeld ein und klickt auf "Absenden".

**Erwartetes Ergebnis:**
Das neue Todo erscheint in der Aufgabenliste.

**Ergebnis:**
Test erfolgreich.

---

### 2. Todo als erledigt markieren

**Ziel:**
Es wird geprüft, ob der Button "Erledigt" bei einem Todo korrekt funktioniert.

**Vorgehen:**
Ein vorhandenes Todo wird geladen. Danach klickt der Benutzer auf "Erledigt".

**Erwartetes Ergebnis:**
Das System sendet eine Anfrage an den Backend-Endpunkt /api/v1/done.

**Ergebnis:**
Test erfolgreich.

---

### 3. Todo löschen

**Ziel:**
Es wird geprüft, ob ein Todo gelöscht werden kann.

**Vorgehen:**
Ein vorhandenes Todo wird geladen. Danach klickt der Benutzer auf "Löschen".

**Erwartetes Ergebnis:**
Das System sendet eine Anfrage an den Backend-Endpunkt /api/v1/delete.

**Ergebnis:**
Test erfolgreich.

---

## Gesamtergebnis

Alle automatisierten Systemtests wurden erfolgreich ausgeführt. Der Teststand schliesst grün ab.
