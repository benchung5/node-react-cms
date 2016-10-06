export function configuration(env) {
  const config = {
    "development": {
      "database": {
        "username": "postgres",
        "password": "3x1mpl3",
        "database": "demo_schema",
        "host": "postgres",
        "dialect": "postgres",
        "dbConnected": true
      },
      "auth": {
        "secret": "34lhj4lhj34o634lllhioh"
      },
      "contact": {
        "to_email": "ben@benchung.com",
        "sendgrid_key": "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"
      },
      "server": {
        "root_url": "http://192.168.99.100:80"
      }
    },
    "production": {
      "database": {
        "username": "postgres",
        "password": "3x1mpl3",
        "database": "demo_schema",
        "host": "postgres",
        "dialect": "postgres",
        "dbConnected": true
      },
      "auth": {
        "secret": "34lhj4lhj34o634lllhioh"
      },
      "contact": {
        "to_email": "ben@benchung.com",
        "sendgrid_key": "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"
      },
      "server": {
        "root_url": "http://104.131.25.104:5246"
      }
    }
  }

  if (env === "development") {
      return config.development;
      //console.log('config-dev ', config.development);
  } else if (env === "production") {
      //console.log('config-prod ', config.production);
      return config.production;
  } else {
      return config.development;
  }

}