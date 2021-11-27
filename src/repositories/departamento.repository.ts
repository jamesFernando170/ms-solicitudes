import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Facultad} from '../models';
import {FacultadRepository} from './facultad.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly d_pertenece_f: BelongsToAccessor<Facultad, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacultadRepository') protected facultadRepositoryGetter: Getter<FacultadRepository>,
  ) {
    super(Departamento, dataSource);
    this.d_pertenece_f = this.createBelongsToAccessorFor('d_pertenece_f', facultadRepositoryGetter,);
    this.registerInclusionResolver('d_pertenece_f', this.d_pertenece_f.inclusionResolver);
  }
}
