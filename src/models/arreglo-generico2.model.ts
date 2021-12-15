import {Model, model, property} from '@loopback/repository';

@model()
export class ArregloGenerico2 extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  arregloGenerico: number[];

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


  constructor(data?: Partial<ArregloGenerico2>) {
    super(data);
  }
}

export interface ArregloGenerico2Relations {
  // describe navigational properties here
}

export type ArregloGenerico2WithRelations = ArregloGenerico2 & ArregloGenerico2Relations;
