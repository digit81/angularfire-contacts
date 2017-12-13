// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBrZwlDzK11XMBeIrcQg0A75tICFwG99kQ',
    authDomain: 'contacts-71eaa.firebaseapp.com',
    databaseURL: 'https://contacts-71eaa.firebaseio.com',
    projectId: 'contacts-71eaa',
    storageBucket: 'contacts-71eaa.appspot.com',
    messagingSenderId: '662925280283'
  }
};
