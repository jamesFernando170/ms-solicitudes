import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Solicitud, SolicitudComite} from '../models';
import {ArregloGenerico} from '../models/arreglo-generico.model';
import {SolicitudComiteRepository} from '../repositories';

/*
Este controlador "SolicitudComiteController" es el resultado de la relacion de los modelos Solicitud y Comite, donde podremos realizar
operaciones CRUD, donde podremos agregar, actualizar, eliminar, etc, SolicitudComite
*/

export class SolicitudTiposComiteController {
  constructor(
    @repository(SolicitudComiteRepository)
    public solicitudComiteRepository: SolicitudComiteRepository,
  ) { }

  @post('/solicitud-comites')
  @response(200, {
    description: 'SolicitudComite model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudComite)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudComite, {
            title: 'NewSolicitudComite',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudComite: Omit<SolicitudComite, 'id'>,
  ): Promise<SolicitudComite> {
    return this.solicitudComiteRepository.create(solicitudComite);
  }

  @get('/solicitud-comites/count')
  @response(200, {
    description: 'SolicitudComite model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudComite) where?: Where<SolicitudComite>,
  ): Promise<Count> {
    return this.solicitudComiteRepository.count(where);
  }

  @get('/solicitud-comites')
  @response(200, {
    description: 'Array of SolicitudComite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudComite, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudComite) filter?: Filter<SolicitudComite>,
  ): Promise<SolicitudComite[]> {
    return this.solicitudComiteRepository.find(filter);
  }

  @patch('/solicitud-comites')
  @response(200, {
    description: 'SolicitudComite PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudComite, {partial: true}),
        },
      },
    })
    solicitudComite: SolicitudComite,
    @param.where(SolicitudComite) where?: Where<SolicitudComite>,
  ): Promise<Count> {
    return this.solicitudComiteRepository.updateAll(solicitudComite, where);
  }

  @get('/solicitud-comites/{id}')
  @response(200, {
    description: 'SolicitudComite model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudComite, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudComite, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudComite>
  ): Promise<SolicitudComite> {
    return this.solicitudComiteRepository.findById(id, filter);
  }

  @patch('/solicitud-comites/{id}')
  @response(204, {
    description: 'SolicitudComite PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudComite, {partial: true}),
        },
      },
    })
    solicitudComite: SolicitudComite,
  ): Promise<void> {
    await this.solicitudComiteRepository.updateById(id, solicitudComite);
  }

  @put('/solicitud-comites/{id}')
  @response(204, {
    description: 'SolicitudComite PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudComite: SolicitudComite,
  ): Promise<void> {
    await this.solicitudComiteRepository.replaceById(id, solicitudComite);
  }

  @del('/solicitud-comites/{id}')
  @response(204, {
    description: 'SolicitudComite DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudComiteRepository.deleteById(id);
  }

  @post('/asociar-solicitud-comites/{id}', {
    responses: {
      '200': {
        description: 'create a instance of Rol with a usuario',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudComite)}},
      },
    },
  })
  async crearRelaciones(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArregloGenerico, {}),
        },
      },
    }) datos: ArregloGenerico,
    @param.path.string('id') solicitudId: typeof Solicitud.prototype.id
  ): Promise<Boolean> {
    if (datos.arregloGenerico.length > 0) {
      datos.arregloGenerico.forEach(async (tiposComiteId: number) => {
        let existe = await this.solicitudComiteRepository.findOne({
          where: {
            tiposComiteId: tiposComiteId,
            solicitudId: solicitudId
          }
        })
        if (!existe) {
          this.solicitudComiteRepository.create({
            tiposComiteId: tiposComiteId,
            solicitudId: solicitudId
          });
        }

      });
      return true;
    }
    return false;
  }
}
