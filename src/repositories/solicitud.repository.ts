import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, TipoSolicitud, EstadoSolicitud, Modalidad, AreaInvestigacion, TiposComite, SolicitudComite} from '../models';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';
import {ModalidadRepository} from './modalidad.repository';
import {AreaInvestigacionRepository} from './area-investigacion.repository';
import {SolicitudComiteRepository} from './solicitud-comite.repository';
import {TiposComiteRepository} from './tipos-comite.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly s_es_ts: BelongsToAccessor<TipoSolicitud, typeof Solicitud.prototype.id>;

  public readonly s_tiene_es: BelongsToAccessor<EstadoSolicitud, typeof Solicitud.prototype.id>;

  public readonly s_tiene_m: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly s_tiene_ai: BelongsToAccessor<AreaInvestigacion, typeof Solicitud.prototype.id>;

  public readonly tiposComites: HasManyThroughRepositoryFactory<TiposComite, typeof TiposComite.prototype.id,
          SolicitudComite,
          typeof Solicitud.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('AreaInvestigacionRepository') protected areaInvestigacionRepositoryGetter: Getter<AreaInvestigacionRepository>, @repository.getter('SolicitudComiteRepository') protected solicitudComiteRepositoryGetter: Getter<SolicitudComiteRepository>, @repository.getter('TiposComiteRepository') protected tiposComiteRepositoryGetter: Getter<TiposComiteRepository>,
  ) {
    super(Solicitud, dataSource);
    this.tiposComites = this.createHasManyThroughRepositoryFactoryFor('tiposComites', tiposComiteRepositoryGetter, solicitudComiteRepositoryGetter,);
    this.registerInclusionResolver('tiposComites', this.tiposComites.inclusionResolver);
    this.s_tiene_ai = this.createBelongsToAccessorFor('s_tiene_ai', areaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('s_tiene_ai', this.s_tiene_ai.inclusionResolver);
    this.s_tiene_m = this.createBelongsToAccessorFor('s_tiene_m', modalidadRepositoryGetter,);
    this.registerInclusionResolver('s_tiene_m', this.s_tiene_m.inclusionResolver);
    this.s_tiene_es = this.createBelongsToAccessorFor('s_tiene_es', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('s_tiene_es', this.s_tiene_es.inclusionResolver);
    this.s_es_ts = this.createBelongsToAccessorFor('s_es_ts', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('s_es_ts', this.s_es_ts.inclusionResolver);
  }
}
