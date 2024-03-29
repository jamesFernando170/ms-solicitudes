import {Entity, hasMany, model, property} from '@loopback/repository';
import {AreaInvestigacion} from './area-investigacion.model';
import {InvitacionEvaluar} from './invitacion-evaluar.model';
import {JuradoAreaInvestigacion} from './jurado-area-investigacion.model';
import {Solicitud} from './solicitud.model';

@model()
// documentoo, apellidos, fechaNaciento
export class Jurado extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  entidad: string;

  @property({
    type: 'string'
  })
  clave?: string;

  @property({
    type: 'string'
  })
  documento?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @hasMany(() => InvitacionEvaluar, {keyTo: 'idJurado'})
  invitacionEvaluars: InvitacionEvaluar[];

  @hasMany(() => AreaInvestigacion, {through: {model: () => JuradoAreaInvestigacion}})
  areaInvestigacions: AreaInvestigacion[];

  @hasMany(() => Solicitud, {through: {model: () => InvitacionEvaluar, keyFrom: 'idJurado', keyTo: 'idSolicitud'}})
  solicituds: Solicitud[];

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
