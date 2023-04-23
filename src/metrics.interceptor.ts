import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Counter, Histogram, register } from 'prom-client';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  private requestCounter: Counter<string>;
  private errorCounter: Counter<string>;
  private requestLatency: Histogram<string>;

  constructor() {
    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });

    this.errorCounter = new Counter({
      name: 'http_errors_total',
      help: 'Number of HTTP errors',
      labelNames: ['method', 'route', 'status'],
    });

    this.requestLatency = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request latency in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.5, 1, 5, 10],
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestStartTime = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      tap(
        () => {
          this.recordMetrics(request, requestStartTime, false);
        },
        () => {
          this.recordMetrics(request, requestStartTime, true);
        },
      ),
    );
  }

  private recordMetrics(request, requestStartTime, isError: boolean) {
    const latency = (Date.now() - requestStartTime) / 1000;
    const route = request.route.path;
    const method = request.method;
    const status = request.res.statusCode;

    this.requestCounter.labels(method, route, status).inc();
    this.requestLatency.labels(method, route, status).observe(latency);

    if (isError) {
      this.errorCounter.labels(method, route, status).inc();
    }
  }
}
