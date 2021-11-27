import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class AreaInvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Solicitud, {keyTo: 'idAreaInvestigacion'})
  solicituds: Solicitud[];

  constructor(data?: Partial<AreaInvestigacion>) {
    super(data);
  }
}

export interface AreaInvestigacionRelations {
  // describe navigational properties here
}

export type AreaInvestigacionWithRelations = AreaInvestigacion & AreaInvestigacionRelations;
