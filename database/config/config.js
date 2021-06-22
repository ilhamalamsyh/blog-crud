require('dotenv').config();

module.exports = {
  development: {
    username: 'Gojo Satoru',
    password: 'n32uk0ch4n301',
    database: 'blog_crud',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: 'DEV_DATABASE_URL'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable:'TEST_DATABASE_URL'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable:'PROD_DATABASE_URL'
  }
}