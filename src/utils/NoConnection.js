import { useState, useEffect } from 'react';
import snackbar from 'utils/snackbar';
import { withSnackbar } from 'notistack';

function NoConnection({ closeSnackbar }) {
  const [offline, setOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  const snackbarOnline = () => snackbar.success("We're back online!");
  const snackbarOffline = () =>
    snackbar.error("You're offline, some features may be unavailable", {
      persist: true,
      key: 'snackbarError',
    });

  useEffect(() => {
    const handleConnectionChange = () => {
      if (navigator.onLine) {
        const webPing = setInterval(() => {
          fetch('//google.com', {
            mode: 'no-cors',
          })
            .then(() => {
              setOffline(false);
            })
            .then(() => {
              clearInterval(webPing);
            })
            .catch(() => {
              setOffline(true);
            });
        }, 2000);
        return;
      }

      setOffline(true);
    };

    handleConnectionChange();
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  useEffect(() => {
    if (offline) {
      snackbarOffline();
      setWasOffline(true);
    }
  }, [offline]);

  useEffect(() => {
    if (wasOffline && !offline) {
      closeSnackbar('snackbarError');
      snackbarOnline();
    }
  }, [offline, wasOffline, closeSnackbar]);

  return null;
}

export default withSnackbar(NoConnection);
