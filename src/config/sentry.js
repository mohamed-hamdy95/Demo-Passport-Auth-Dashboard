import * as Sentry from '@sentry/react';

const initiateSentry = () => {
  if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
    });

    Sentry.configureScope(scope => {
      scope.setTag('route_path', window.location.pathname);
      scope.setTag('environment', process.env.NODE_ENV);
    });
  }
};

export default initiateSentry;

export const setUserSentry = (id, email) => {
  Sentry.configureScope(scope => {
    scope.setUser({ id, email });
  });
};
