import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProponenteTrabajo,
  TipoVinculacion,
} from '../models';
import {ProponenteTrabajoRepository} from '../repositories';

export class ProponenteTrabajoTipoVinculacionController {
  constructor(
    @repository(ProponenteTrabajoRepository)
    public proponenteTrabajoRepository: ProponenteTrabajoRepository,
  ) { }

  @get('/proponente-trabajos/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'TipoVinculacion belonging to ProponenteTrabajo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoVinculacion)},
          },
        },
      },
    },
  })
  async getTipoVinculacion(
    @param.path.number('id') id: typeof ProponenteTrabajo.prototype.id,
  ): Promise<TipoVinculacion> {
    return this.proponenteTrabajoRepository.p_tienen_tv(id);
  }
}
