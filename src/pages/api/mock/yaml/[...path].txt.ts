import type { APIRoute, GetStaticPaths } from 'astro';
import { createMockTextResponse, getMockStaticPaths } from '../../../../mock-data/routes';

export const prerender = true;

export const getStaticPaths = (() => getMockStaticPaths('yaml')) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => createMockTextResponse('yaml', params.path);
