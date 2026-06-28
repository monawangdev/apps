import type { APIRoute, GetStaticPaths } from 'astro';
import { createMockResponse, getMockStaticPaths } from '../../../../mock-data/routes';

export const prerender = true;

export const getStaticPaths = (() => getMockStaticPaths('css')) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => createMockResponse('css', params.path);
