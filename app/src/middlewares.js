const client = require('prom-client');

const requestCount = new client.Counter({
    name: 'request_count',
    labelNames: ['status', 'path', 'method'],
    help: 'Number of requests handled by the application'
})

const requestTimeSummary = new client.Summary({
    name: 'request_duration_ms',
    labelNames: ['status', 'path', 'method'],
    help: 'Summary of request times in ms'
})

const metricsMiddleware = (req, res, next) => {

    const startTime = process.hrtime();

    res.on('finish', () => {
        const elapsedTime = process.hrtime(startTime);
        const timeInMs = (elapsedTime[0] * 1000) + (elapsedTime[1] / 1e6);
        requestCount.inc({ status: res.statusCode, path: req.baseUrl + req.path, method: req.method });
        requestTimeSummary.labels({ status: res.statusCode, path: req.baseUrl + req.path, method: req.method }).observe(timeInMs)
    });

    next();
}

module.exports = {
    metricsMiddleware
}
