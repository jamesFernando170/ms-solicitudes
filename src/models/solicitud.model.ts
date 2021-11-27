import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoSolicitud} from './tipo-solicitud.model';
import {EstadoSolicitud} from './estado-solicitud.model';
import {Modalidad} from './modalidad.model';
import {AreaInvestigacion} from './area-investigacion.model';
import {TiposComite} from './tipos-comite.model';
import {SolicitudComite} from './solicitud-comite.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string'
  })
  archivo?: string;

  @belongsTo(() => TipoSolicitud, {name: 's_es_ts'})
  idTipoSolicitud: number;

  @belongsTo(() => EstadoSolicitud, {name: 's_tiene_es'})
  idEstadoSolicitud: number;

  @belongsTo(() => Modalidad, {name: 's_tiene_m'})
  idModalidad: number;

  @belongsTo(() => AreaInvestigacion, {name: 's_tiene_ai'})
  idAreaInvestigacion: number;

  @hasMany(() => TiposComite, {through: {model: () => SolicitudComite}})
  tiposComites: TiposComite[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
