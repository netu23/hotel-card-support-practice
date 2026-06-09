# Hotel Booking Interview Practice

This is a React + TypeScript interview practice repository inspired by a fintech-style frontend exercise. It starts as a partially built support tool for investigating hotel card transactions, pre-authorisation holds, and pending refunds.

The app is intentionally incomplete. Your job as the candidate is to continue the implementation while preserving the constraints below.

## Stack

- Create React App with the TypeScript template shape
- Jest + React Testing Library
- MSW v1 for API mocking
- CSS Modules only
- Native `fetch()` only

## Run Locally

```bash
npm install
npm start
```

Run tests:

```bash
npm run test:ci
```

## StackBlitz

Push this repo to GitHub, then import it into StackBlitz with the repository URL. StackBlitz should detect the CRA scripts from `package.json`.

## Candidate Tasks

Suggested order:

1. Implement `addBusinessDays` in `src/utils/addBusinessDays.ts`.
2. Improve `useFetch` so it handles non-2xx responses and errors.
3. Format transaction list amounts and dates.
4. Group transactions into `Holds`, `Payments`, and `Refunds`.
5. Add the pre-authorisation banner and expiry countdown.
6. Add the pending refund estimated arrival date.
7. Implement `useDispute` and wire `DisputeForm`.
8. Turn the `it.todo` tests in `src/App.test.tsx` into real tests.

## Rules

- Avoid `any`.
- Prefer exhaustive switches for transaction type and status handling.
- Use `Intl` for currency and date formatting.
- Keep components focused and small.
- Do not add Axios, React Query, SWR, Tailwind, or component libraries.

## API

MSW serves:

- `GET /api/transactions`
- `GET /api/transactions/:txId`
- `POST /api/transactions/:txId/dispute`

The mock worker is enabled in development and the mock server is enabled during tests.
