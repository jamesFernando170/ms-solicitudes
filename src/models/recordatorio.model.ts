import {belongsTo, Entity, model, property} from '@loopback/repository';
import {InvitacionEvaluar} from './invitacion-evaluar.model';

@model({
  settings: {
    foreignKeys: {
      fk_recordatorio_invitacionEvaluarId: {
        name: 'fk_recordatorio_invitacionEvaluarId',
        entity: 'InvitacionEvaluar',
        entityKey: 'id',
        foreignKey: 'idInvitacionEvaluar',
      },
    },
  },
})
export class Recordatorio extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoRecordatorio: string;

  @belongsTo(() => InvitacionEvaluar, {name: 'r_tiene_ie'})
  idInvitacionEvaluar: number;

  constructor(data?: Partial<Recordatorio>) {
    super(data);
  }
}

export interface RecordatorioRelations {
  // describe navigational properties here
}

export type RecordatorioWithRelations = Recordatorio & RecordatorioRelations;
