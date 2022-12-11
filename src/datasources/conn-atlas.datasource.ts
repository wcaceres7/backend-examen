import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'connAtlas',
  connector: 'mongodb',
  url: 'mongodb+srv://wcaceres:Willian2018@miprimerabasededatos.cbd6dxf.mongodb.net/examenvanguardia',
  host: 'miprimerabasededatos.cbd6dxf.mongodb.net',
  port: 27017,
  user: 'wcaceres',
  password: 'Willian2018',
  database: 'examenvanguardia',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConnAtlasDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'connAtlas';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.connAtlas', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
