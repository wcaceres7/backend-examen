import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Factura} from './factura.model';
import {Productos} from './productos.model';

@model()
export class Detallefactura extends Entity {
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
  facturaid: string;

  @property({
    type: 'string',
    required: true,
  })
  productoid: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
  })
  productosId?: string;

  @belongsTo(() => Factura)
  facturaId: string;

  @hasMany(() => Productos, {keyTo: 'productoid'})
  productos: Productos[];

  constructor(data?: Partial<Detallefactura>) {
    super(data);
  }
}

export interface DetallefacturaRelations {
  // describe navigational properties here
}

export type DetallefacturaWithRelations = Detallefactura & DetallefacturaRelations;
