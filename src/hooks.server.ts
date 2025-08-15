// src/hooks.server.ts
import { initDatabase } from '$lib/server/db/index.js';
import type { ServerInit } from '@sveltejs/kit';

export const init: ServerInit = () => {
    initDatabase();
};
