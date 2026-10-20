import { env } from '../config/env.js';

export const notFound = (req, res) => res.status(404).json({ message: 'Not found' });

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    message: env.isProd ? 'Something went wrong' : err.message,
  });
}
