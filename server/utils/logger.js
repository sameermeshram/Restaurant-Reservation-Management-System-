const write = (level, ...args) => {
  const timestamp = new Date().toISOString();
  const serializedArgs = args.map((arg) => {
    if (arg instanceof Error) {
      return arg.stack || arg.message;
    }

    if (typeof arg === 'object') {
      return JSON.stringify(arg);
    }

    return String(arg);
  });

  const logLine = `[${timestamp}] [${level}] ${serializedArgs.join(' ')}`;

  if (level === 'ERROR' || level === 'WARN') {
    process.stderr.write(`${logLine}\n`);
    return;
  }

  process.stdout.write(`${logLine}\n`);
};

export const logger = {
  info: (...args) => write('INFO', ...args),
  warn: (...args) => write('WARN', ...args),
  error: (...args) => write('ERROR', ...args),
  http: (...args) => write('HTTP', ...args),
};

