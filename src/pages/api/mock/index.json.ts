import type { APIRoute } from 'astro';
import { getMockIndex } from '../../../mock-data/routes';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(getMockIndex(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
