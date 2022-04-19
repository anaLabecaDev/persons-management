import { rest } from 'msw';

export const handlers = [
  rest.get('/person', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.get('/person/search', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
];
