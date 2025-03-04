import type { NextApiRequest, NextApiResponse } from 'next';
import * as promClient from 'prom-client';

// Check if Prometheus metrics are enabled via environment variable
/* eslint-disable-next-line no-restricted-properties */
const isEnabled = process.env.PROMETHEUS_METRICS_ENABLED === 'true';

// Initialize Prometheus metrics collection if enabled
// Collects default metrics with 'frontend_' prefix
isEnabled && promClient.collectDefaultMetrics({ prefix: 'frontend_' });

// Metrics endpoint
// Exposes Prometheus metrics for monitoring
// Returns metrics in Prometheus format
export default async function metricsHandler(req: NextApiRequest, res: NextApiResponse) {
  const metrics = await promClient.register.metrics();
  res.setHeader('Content-type', promClient.register.contentType);
  res.send(metrics);
}
