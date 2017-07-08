/*
  :: process.env.NODE_ENV variable ::
  - not set locally by default
  - Heroku sets to "production" by default
  - Running with "start" script will default to "development"
  - Running with "test" script will set to "test" via package.JSON
*/

const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  // sets PORT on process.env object
  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
}
