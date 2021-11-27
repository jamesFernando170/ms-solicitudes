import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recordatorio, RecordatorioRelations, InvitacionEvaluar} from '../models';
import {InvitacionEvaluarRepository} from './invitacion-evaluar.repository';

export class RecordatorioRepository extends DefaultCrudRepository<
  Recordatorio,
  typeof Recordatorio.prototype.id,
  RecordatorioRelations
> {

  public readonly r_tiene_ie: BelongsToAccessor<InvitacionEvaluar, typeof Recordatorio.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('InvitacionEvaluarRepository') protected invitacionEvaluarRepositoryGetter: Getter<InvitacionEvaluarRepository>,
  ) {
    super(Recordatorio, dataSource);
    this.r_tiene_ie = this.createBelongsToAccessorFor('r_tiene_ie', invitacionEvaluarRepositoryGetter,);
    this.registerInclusionResolver('r_tiene_ie', this.r_tiene_ie.inclusionResolver);
  }
}
