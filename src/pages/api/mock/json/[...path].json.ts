import type { APIRoute, GetStaticPaths } from 'astro';
import { createMockResponse, getMockStaticPaths } from '../../../../mock-data/routes';

export const prerender = true;

export const getStaticPaths = (() => getMockStaticPaths('json')) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => createMockResponse('json', params.path);
