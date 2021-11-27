import {Entity, hasMany, model, property} from '@loopback/repository';
import {Recordatorio} from './recordatorio.model';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';

@model()
export class InvitacionEvaluar extends Entity {
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
  fechaRespuesta: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInvitacion: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoInvitacion: string;

  @hasMany(() => Recordatorio, {keyTo: 'idInvitacionEvaluar'})
  recordatorios: Recordatorio[];

  @hasMany(() => ResultadoEvaluacion, {keyTo: 'idInvitacionEvaluar'})
  resultadoEvaluacions: ResultadoEvaluacion[];

  @property({
    type: 'number',
  })
  idJurado?: number;

  @property({
    type: 'number',
  })
  idSolicitud?: number;

  constructor(data?: Partial<InvitacionEvaluar>) {
    super(data);
  }
}

export interface InvitacionEvaluarRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarWithRelations = InvitacionEvaluar & InvitacionEvaluarRelations;
