# aschehoug-code-challenge

## Assignment

## Solution description

På grunn av at det er ønsket å vise hva jeg kan så har jeg valgt å utvide scopet noe. Under går jeg igjennom det meste av det jeg har laget som er ut over scopeet.

- Verktøy
- Drag and drop functionality
- Component struktur
- Testing
- (TODO) Git hygiene
- Tester
- (TODO) Authentication through Auth0
- (TODO) Pipeline
- (TODO) Hosting on AWS
- (TODO) Integrating with S3
- (TODO) Xata as DB provider

## Verktøy

Full disclosure: Github Copilot er benyttet under utviklingen av denne oppgaven.

## Component struktur

### Hovedstruktur (Dobbelsjekk at du bruker Atomic design korrekt )

Oppsettet er inspirert av Atomic design hvor filen `src/components/Form/Forms/FileUpload.vue` er et molekyl som består av flere atomer. Altså et `<form>` som består av potensielt flere `<input>`-elementer.

Atomene ligger da i filen elementer og blir hentet inn i Molekylene.

### Helpers

Siden noen av funksjonene er relativt kompliserte, så valgte jeg å ta dem ut av .vue komponenten og legge dem i en egen helpers.ts fil. Skal løsningen skaleres opp bør denne filen heller benyttes som en import/ export fil. men da kanskje endre navnet til index.ts.

Ofte gjør man dette for å sikre gjenbrukbarhet men i dette tilfellet var det for å gjøre det lettere å gjennomføre unittester.

### CSS

Meste parten av stylingen er default vue applikasjon. Det er ikke gjort noen store endringer annet enn utvidelser etter behov. Dette var for å prioritere å vise kompetanse på bekymringsområder etter samtale med Morten.

## Tester

Som testverktøy har jeg benyttet meg av Vitest for Unit-tester og Cypress til E2E tester.

### Vitest

Vitest er et Jest inspirert rammeverk som er spesiallaget for Vite miljø. Den har tilnærmet samme syntax som Jest og er svært lett å sette opp.
Du finner filene under `src/utils/_\_tests__/helpers` og den tester alle funksjonene som finnes i `src/utils/helpers`

```sh
npm run test:unit

# and

npm run test:unit-coverage
```

### Cypress

For å kjøre cypress testene
