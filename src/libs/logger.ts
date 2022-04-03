import pino from 'pino';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'debug',
});

// Redefined console.log for external libs that have
// the bad idea to use it
// eslint-disable-next-line no-console
console.log = (...args) => logger.debug({ src: 'console.log', args });
