import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnAtlasDataSource} from '../datasources';
import {Factura, FacturaRelations, Detallefactura} from '../models';
import {DetallefacturaRepository} from './detallefactura.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly facturacondetalle: HasManyRepositoryFactory<Detallefactura, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.connAtlas') dataSource: ConnAtlasDataSource, @repository.getter('DetallefacturaRepository') protected detallefacturaRepositoryGetter: Getter<DetallefacturaRepository>,
  ) {
    super(Factura, dataSource);
    this.facturacondetalle = this.createHasManyRepositoryFactoryFor('facturacondetalle', detallefacturaRepositoryGetter,);
    this.registerInclusionResolver('facturacondetalle', this.facturacondetalle.inclusionResolver);
  }
}
