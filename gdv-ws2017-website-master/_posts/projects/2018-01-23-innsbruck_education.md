---
layout: page
title:  "InnsbruckEducation"
subheadline: "Untersuchung der Korrelation zwischen der Bevölkerungsdichte und den Bildungseinrichtungen"
teaser: "Untersuchung der Korrelation zwischen der Bevölkerungsdichte und den Bildungseinrichtungen"
header: no
show_meta: false
categories:
    - projects
image:
    title: innsbruck_education/screenshot_main.png
    caption: "Hauptansicht der InnsbruckEducation-Anwendung"
author: "Flaubert Bertoli, Felix Hefner, Max Jando &amp; Severin Kohler"
---

## Abstract

Innsbruck ist eine Stadt im Herzen Österreichs mit 130.000 Einwohnern. 
Im Jahr 2017 waren hiervon ca. ein Drittel im Schüler- und Studentenalter.
Wir haben uns in diesem Visualisierungsprojekt die Frage gestellt, 
inwiefern das Schul- und Hochschul-Angebot innerhalb der einzelnen Gebiete 
der Stadt mit der dort anwesenden potentiellen Schüler- und Studentenschaft in 
Verbindung gebracht werden kann. Daraus entstanden ist eine Processing-Anwendung, 
die neben einer Heatmap Innsbrucks ein Streudiagramm zeigt.

## Einführung / Konzept

### Motivation
Als Studenten wollten wir ein Thema finden, das uns direkt betrifft und interessiert. Wir stellten Nachforschungen an und fanden das OpenData Portal von Innsbruck, auf dem alle Stadtteile (Einwohner und Alter dieser) und Bildungseinrichtungen gelistet waren. Daraufhin wollten wir wissen, ob Stadtteile mit vielen Bildungseinrichtungen für junge Menschen attraktive Wohngegenden darstellen. Dies zu visuallisieren weckte unser Interesse. 

### Das Konzept
Die Grundidee war eine Karte von Innsbruck unterteilt in Stadtteilen die die jeweiligen Bildungseinrichtungen halten zu visualisieren. Anhand einer Einfärbung der Stadtteile je nach Bevölkerungsdichte von Einwohnern zwischen 6 und 29 Jahren (übliches Alter von Schülern und Studenten) sollte verdeutlicht werden wieviele Schüler und Studenten in den jeweiligen Stadtteilen leben. Um die Korrelation der Schüler und Studenten in den Stadteilen mit den Bildungseinrichtungen noch besser herauszuarbeiten (nicht nur auf der Stadtkarte) sollte ein Scatterplot der die Anzahl der Bildungseinrichtungen und Einwohnern (6-29 Jahre) der einzelnen Stadtteile vergleicht Dargestellt werden. Zusätzlich fügten wir dann noch einen Schieberegler von den Jahren 2013 bis 2017 hinzu um die Zu- und Abwanderungsrate von Schülern und Studenten in die einzelnen Bezirke zu visualisieren. Des Weiteren wurden noch 2 Knöpfe eingebaut die dazu dienen entweder nur Schulen oder höhere Bildungseinrichtungen anzuzeigen.

### Unsere Hypothesen
- Haupthypothese: 

> **"Korreliert die Anzahl der Bildungseinrichtungen in den Stadtteilen von Innsbruck mit der Anzahl der Schüler/Studenten in selbigen?"**

- Nebenhypothese 1: 

> *"Korrelierte die Einwohnerdichte der Schüler/Studenten schon immer mit der Anzahl der Bildungseinrichtungen in Innsbruck oder hat sich dies erst über die Jahre dahingehend entwickelt?"*

- Nebenhypothesen 2: 

> *"Gilt diese Korrelation nur für höhere Bildungseinrichtungen unabhängig von Schulen oder vice versa?"*


## Daten

### Datenerhebung

Sämtliche Daten, die wir für die Visualisierung benutzt haben, stammen direkt aus dem [Datenauftritt der Stadt Innsbruck](https://www.data.gv.at/auftritte/?organisation=stadt-innsbruck&nr=2){:target="_blank"}. 
Dieser ist Teil des [Open Data Portals der Regierung Österreichs](https://www.data.gv.at/){:target="_blank"}.
Die Daten konnten dort direkt in geeigneten Formaten heruntergeladen werden. Ein Scrapper für eine API wurde hierfür nicht benötigt.
Sämtliche geografische Kartendaten stammen aus dem [Openstreetmap](https://osm.org){:target="_blank"}-Projekt.

### Formate

Unsere erhobenen Daten lagen in folgenden Formaten vor:

- `.csv` für tabelarische Datensätze in strukturierter Form
- `.geo.json` für die geographischen Daten

### Datenaufbereitung

Um die Daten in unserer Anwendung sinnvoll nutzen zu können, mussten sie mit diversen Texteditoren und Tabellenkalkulationen und Bash-Scripten wie folgt bearbeitet werden:

- Formatanpassungen der `.csv`-Dateien
- Zusammenführen mehrerer Datensätze (Einwohner pro Jahr) zu einer Datei (Einwohner über mehrere Jahre)
- Kürzen von Header-Informationen
- Korrigieren von Umlauten
- Entfernen von unvollständigen Einträgen
- Mapping Zählersprengel (eine kleine Verwaltungseinheit für Bezirke in Österreich) zu Stadtteilen
	- Hier waren uns die Einwohnerzahlen pro Zählersprengel bekannt, jedoch nur die geographischen Ausprägungen auf Stadtteil-Ebene

### Relevante Datensätze

Nach der Datenaufbereitung entschieden wir uns, folgende erhaltene Datensätze aufgrund Ihrer Relevanz zu berücksichtigen:

- Geographische Gliederung der Stadt in 20 Stadtteile
- Einwohnerzahlen pro Altersgruppe (0-2, 3-5, 6-9, 10-14, 15-19, usw.) und Zählersprengel
	- Hiervon gab es jeweils einen Datensatz pro Jahr für den Zeitraum *2013-2017*
- Mapping-Tabelle: Stadtteil <-> zugehörige Zählersprengel
- Standorte (Breiten- und Längengrad) für sämtliche Bildungseinrichtungen der Stadt
- Metadaten der Bildungseinrichtungen (Art der Einrichtung, Name, Adresse, Website)

Das folgende Listing zeigt einen Ausschnitt aus den `.geo.json`- Daten. 
Hier wird ein Polygon mit allen Eckpunkten eines Stadtteils definiert (hier auf 2 Eckpunkte gekürzt).

{% highlight json %}
{"properties": 
	{ 
		"NR": 1, "BEZEICH": "Innenstadt" 
	}, 
	"geometry": { "type": "Polygon", "coordinates": [ 
		[ 
			[ 11.395122994656139, 47.273272130375268 ], 
			[ 11.395604221218592, 47.273105775547322 ],
			// ...
			]
		]
	}
}
{% endhighlight %}

## Prototyp

### Visualisierung
Innerhalb der Projektlaufzeit wurde von den Autoren dieser Microsite ein interaktiver Prototyp 
in Form einer Java-Anwendung erstellt. Die folgende Abbildung zeigt die Anwendung im Ganzen, 
wobei wichtige Bereiche hervorgehoben sind. Anschließend werden diese Bereiche genauer beschrieben.

<figure>
  <img src="{{ site.urlimg }}innsbruck_education/screenshot_main_with_numbers.png" width="92%"/>
  <figcaption>Relevante Elemente der <i>InnsbruckEducation</i>-Anwendung</figcaption>
</figure>

1. Karte der Stadt Innsbruck
	- Abgrenzungen der Stadtteile
	- **Heatmap**: Je dunkler der Rot-Ton, desto mehr Schüler/Studendten wohnen im Stadtteil
	- Hervorhebung eines Stadtteils nach Auswahl
2. Streudiagramm (Scatterplot)zum Verhältnis Anzahl Bildungseinrichtungen/Anzahl Einwohner
	- Je nach eingestelltem Filter ändern sich die Achsen und die Inhalte
	- Der aktuell ausgewählte Bezirk wird im Scatterplot farblich hervorgehoben
3. **Verbindung zwischen Karte und Scatterplot**
	- Wenn ein Stadtteil auf der Karte angeklickt wird, wird dieses im Streudigramm markiert
	- Wird auf der anderen Seite ein Punkt (welcher ein Stadtteil repräsentiert) im Digramm angeklickt, hat dies auch Auswirkungen auf die Stadtkarte
4. Legende und Interaktions-Elemente:
	- Schalter, um die Anzeige von Schulen und Hochschulen separat ein-/auszuschalten
	- Ein Schieberegler, um das derzeit anzuzeigende Jahr zu wechseln (2013-2017)

### Interaktionen
Der Nutzer unserer Anwendung kann über multiple Arten mit dieser interagieren:

- **Klicken und Ziehen auf der Karte:** Karte bewegen
- **Klick auf Stadtteil auf der Karte bzw. auf dem Scatterplot:** Zoom & Hervorheben des selektierten Stadtteils
- **Rechtsklick:** Zurück zur Startansicht
- **Aktivieren bzw. Deaktivieren der Schalter für Schulen/Hochschulen:** Ein- bzw. Ausblenden der jeweiligen Einrichtungs-Art
- **Selektion eines Jahres durch den Jahres-Slider:** Vollständige Aktualisierung der Visualisierungen auf das neu ausgewählte Jahr
- **Hovern über eine Bildungseinrichtung:** Anzeige einer Info-Box mit Daten zur jeweiligen Einrichtung (Name, Typ, Adresse)
- **Hovern über nicht-selektierten Bezirk:** Temporäre Einblendung der Standorte der Bildungseinrichtungen des jeweiligen Bezirks

<figure>
  <div align="center">
  	<img src="{{ site.urlimg }}innsbruck_education/ui_elements.png" />
  	<figcaption>Interaktive UI-Elemente der Anwendung</figcaption>
  </div>
</figure>

### Demonstration

Das folgende Video zeigt unseren Prototyp in Aktion:

**TODO: Video (Youtube) einfügen!**

### Erkenntnisse
Es zeigte sich nach den ersten Anläufen schnell das die Anzahl der Schüler und Studenten mit dennen der Bildungseinrichtungen in den Stadtteilen korreliert. 

<figure>
  <div align="center">
  	<img src="{{ site.urlimg }}innsbruck_education/Scatterplot_2017.png" />
  	<figcaption>Scatterplot zum Jahr 2017</figcaption>
  </div>
</figure>

Es gab jedoch Ausnahmen, z.B. zwei drei Ausreiser in dennen mehr Schüler und Studenten leben aber eher eine mittlere Dichte an Bildungseinrichtungen vorhanden ist. Dabei gibt es einen Extremwert indem viele Schüler/Studenten leben aber nur 2 Bildunseirnichtungen vorhanden sind. Jedoch sind diese Stadteile oft relativ klein und liegen neben Stadtteilen mit vielen Bildungseinrichtungen. 

<figure>
  <img src="{{ site.urlimg }}innsbruck_education/Extremwert_Pradl.png" />
  <figcaption>Extremwert im Bezirk Pradl</figcaption>
</figure>

Des Weiteren gibt es 2 Stadtteile, in denen das Verhältnis zwischen der Anzahl der Bildungseinrichtungen zu der dortigen Einwohnerzahl deutlich über dem Stadtdurchschnitt liegt. Im Gesamtkontext zeigt sich die Haupthypothese als bestätgit. 

Die nachstehende Abbildung zeigt einen Ort, an dem untypischerweiße drei Schulen quasi in unmittelbarer Nähe zu erkennen sind. 
Als wir die Labels für die Bildungseinrichtungen implementiert hatten, konnten wir feststellen, dass es sich hier um Berufsschulen handelt, die in einem Schulkomplex untergebracht sind.

<figure>
  <div align="center">
  	<img src="{{ site.urlimg }}innsbruck_education/school_cluster.png" />
  	<figcaption>Cluster mit 3 Schulen</figcaption>
  </div>
</figure>

## Implementierung

### Tools & Technologien

Für die Realisierung des vorgestellten Prototypen wurde auf folgende Technologien, Frameworks und Tools zurückgegriffen:

- **Programmiersprache:** [Java 8](http://openjdk.java.net/){:target="_blank"}
- **Visualisierungs-Framework:** [Processing 3](https://processing.org/){:target="_blank"}
- **Bibliothek für geografische Karten:** [Unfolding Maps](http://unfoldingmaps.org/){:target="_blank"}
- **Scatter-Plots und Farbpaletten:** [GiCentre Utilities](https://www.gicentre.net/software/#/utils/){:target="_blank"}
- **UI-Elemente:** [CardsUI](http://web.media.mit.edu/~cassiano/projects/cards_ui/){:target="_blank"}
- **Entwicklungsumgebung:** [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/){:target="_blank"}
- **Build-Tool:** [Gradle](https://gradle.org/){:target="_blank"}
- **Datenanpassung:** [Bash](https://www.gnu.org/software/bash/){:target="_blank"}-Skripte
- **Datenaufbereitung:** 
	- **Texteditoren:** [vim](http://www.vim.org/){:target="_blank"}, [micro](https://github.com/zyedidia/micro){:target="_blank"}, [gedit](https://wiki.gnome.org/Apps/Gedit){:target="_blank"}
	- **Tabellenkalkulation:** [Libreoffice Calc](https://de.libreoffice.org/discover/calc/){:target="_blank"}
- **Versionsverwaltung:** [Git](https://git-scm.com/), Repository gehosted auf [Github](https://github.com){:target="_blank"}

### Schwierigkeiten während der Umsetzung

Folgende Probleme sind während der Realisierung unseres Prototyps aufgetreten, die größtenteils jedoch relativ schnell adressiert werden konnten:

- Implementierung von GUI-Elementen in Processing
	- Es gibt nur wenige fertige Bibliotheken, die meisten sind nicht mehr mit Processing 3 kompatibel
	- Manche Bibliotheken nur mit rudimentärer Funktionalität (z.B. keine Listener)
	- Einige Funktionen mussten manuell ergänzt werden und durch Trial&Error erforscht werden
- Mapping zwischen den Zählersprengeln und den Stadtteilen
	- Geographische Abgrenzungen Innsbrucks war nur auf Stadtteile-Ebene (grob) vorhanden, die Einwohnerzahlen jedoch nur für die Zählersprengel (fein)
	- Mit Hilfe eines dritten Datensatzes musste ein Mapping implementiert werden
- Verbindung zwischen Scatterplot und Karte herstellen
	- Für jeden Punkt im Scatterplot musste manuell ein pixelgenauer Listener mit geeignetem Toleranz-Radius hinzugefügt werden
- Korrekte Platzierung und Größe der Marker-Labels

## Fazit

### Reflektion

### Ausblick

Aufgrund der knappen Projektbearbeitungszeit sowie diversen technischen Schwierigkeiten sowie Fehlen gewisser Daten konnten folgende ursprünglich geplante Aspekte nicht umgesetzt werden:

- Visualisierung der Wege der Schüler und Studenten Innsbrucks zu Ihren jeweiligen Bildungseinrichtungen
- Anpassung an diverse Bildschirmgrößen
  - Derzeit läuft die Anwendung nur mit einer Fenstergröße von 1280*720
- Darstellung der Migrationsströme innerhalb der Stadt
- Einbeziehung der **Gesamt-Kapazitäten** und **Auslastungen** der angezeigten Bildungseinrichtungen
  - Daten über die derzeitige Auslastung der Unis und Hochschulen waren vorhanden, hätten jedoch einzeln aufbereitet werden müssen
  - Solche Daten von Schulen zu bekommen, gestaltet sich um Einiges aufwendiger

### Selbst ausprobieren?

Den Quellcode des Projekts finden Sie zum selbst Ausprobieren [in diesem Github-Repository](https://github.com/fhefner/gdv-ws17).
