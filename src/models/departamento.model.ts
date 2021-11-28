import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Facultad} from './facultad.model';

@model({
  settings: {
    foreignKeys: {
      fk_departamento_facultadId: {
        name: 'fk_departamento_facultadId',
        entity: 'Facultad',
        entityKey: 'id',
        foreignKey: 'idFacultad',
      }
    },
  },
})
export class Departamento extends Entity {
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

  @belongsTo(() => Facultad, {name: 'd_pertenece_f'})
  idFacultad: number;

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
