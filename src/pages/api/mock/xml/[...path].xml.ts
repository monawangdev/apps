import type { APIRoute, GetStaticPaths } from 'astro';
import { createMockResponse, getMockStaticPaths } from '../../../../mock-data/routes';

export const prerender = true;

export const getStaticPaths = (() => getMockStaticPaths('xml')) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => createMockResponse('xml', params.path);
