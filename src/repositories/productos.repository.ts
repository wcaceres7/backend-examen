import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {ConnAtlasDataSource} from '../datasources';
import {Productos, ProductosRelations, Detallefactura} from '../models';
import {DetallefacturaRepository} from './detallefactura.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly productodetalle: HasManyRepositoryFactory<Detallefactura, typeof Productos.prototype.id>;

  public readonly productos: BelongsToAccessor<Detallefactura, typeof Productos.prototype.id>;

  public readonly productofact: BelongsToAccessor<Detallefactura, typeof Productos.prototype.id>;

  constructor(
    @inject('datasources.connAtlas') dataSource: ConnAtlasDataSource, @repository.getter('DetallefacturaRepository') protected detallefacturaRepositoryGetter: Getter<DetallefacturaRepository>,
  ) {
    super(Productos, dataSource);
    this.productofact = this.createBelongsToAccessorFor('productofact', detallefacturaRepositoryGetter,);
    this.registerInclusionResolver('productofact', this.productofact.inclusionResolver);
    this.productos = this.createBelongsToAccessorFor('productos', detallefacturaRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.productodetalle = this.createHasManyRepositoryFactoryFor('productodetalle', detallefacturaRepositoryGetter,);
    this.registerInclusionResolver('productodetalle', this.productodetalle.inclusionResolver);
  }
}
