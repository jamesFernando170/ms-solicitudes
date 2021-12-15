import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesInvitacionEvaluar extends Model {
  @property({
    type: 'string',
    required: true,
  })
  fechaRespuesta: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaInvitacion: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoInvitacion: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<CredencialesInvitacionEvaluar>) {
    super(data);
  }
}

export interface CredencialesInvitacionEvaluarRelations {
  // describe navigational properties here
}

export type CredencialesInvitacionEvaluarWithRelations = CredencialesInvitacionEvaluar & CredencialesInvitacionEvaluarRelations;
