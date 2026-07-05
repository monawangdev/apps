import type { APIRoute, GetStaticPaths } from 'astro';
import { createMockHtmlResponse, getMockStaticPaths } from '../../../../mock-data/routes';

export const prerender = true;

export const getStaticPaths = (() => getMockStaticPaths('yaml')) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => createMockHtmlResponse('yaml', params.path);
