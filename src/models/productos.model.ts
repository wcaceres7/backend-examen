import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Detallefactura} from './detallefactura.model';

@model()
export class Productos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @hasMany(() => Detallefactura)
  productodetalle: Detallefactura[];

  @belongsTo(() => Detallefactura, {name: 'productos'})
  productosid: string;

  @belongsTo(() => Detallefactura, {name: 'productofact'})
  productoid: string;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
