```sh
npm install

npm run dev

```

Live demo er tilgjengelig på https://main.d1qo5hk9r30bxf.amplifyapp.com/

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

Sørg for å kjøre serveren før du starter cypress testene.

```sh
npm run cy:open
```
