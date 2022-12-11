import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnAtlasDataSource} from '../datasources';
import {Detallefactura, DetallefacturaRelations, Factura, Productos} from '../models';
import {FacturaRepository} from './factura.repository';
import {ProductosRepository} from './productos.repository';

export class DetallefacturaRepository extends DefaultCrudRepository<
  Detallefactura,
  typeof Detallefactura.prototype.id,
  DetallefacturaRelations
> {

  public readonly factura: BelongsToAccessor<Factura, typeof Detallefactura.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Productos, typeof Detallefactura.prototype.id>;

  constructor(
    @inject('datasources.connAtlas') dataSource: ConnAtlasDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Detallefactura, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
