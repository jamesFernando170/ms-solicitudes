import {belongsTo, Entity, model, property} from '@loopback/repository';
import {InvitacionEvaluar} from './invitacion-evaluar.model';

@model({
  settings: {
    foreignKeys: {
      fk_resultadoEvaluacion_invitacionEvaluarId: {
        name: 'fk_resultadoEvaluacion_invitacionEvaluarId',
        entity: 'InvitacionEvaluar',
        entityKey: 'id',
        foreignKey: 'idInvitacionEvaluar',
      },
    },
  },
})
export class ResultadoEvaluacion extends Entity {
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
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  formatoDiligenciado: string;

  @belongsTo(() => InvitacionEvaluar, {name: 're_tiene_ie'})
  idInvitacionEvaluar: number;

  constructor(data?: Partial<ResultadoEvaluacion>) {
    super(data);
  }
}

export interface ResultadoEvaluacionRelations {
  // describe navigational properties here
}

export type ResultadoEvaluacionWithRelations = ResultadoEvaluacion & ResultadoEvaluacionRelations;
