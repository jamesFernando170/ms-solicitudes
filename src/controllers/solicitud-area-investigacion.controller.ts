import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  AreaInvestigacion,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudAreaInvestigacionController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/area-investigacion', {
    responses: {
      '200': {
        description: 'AreaInvestigacion belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AreaInvestigacion)},
          },
        },
      },
    },
  })
  async getAreaInvestigacion(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<AreaInvestigacion> {
    return this.solicitudRepository.s_tiene_ai(id);
  }
}
