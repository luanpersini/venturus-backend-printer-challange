import { faker } from '@faker-js/faker'
import * as request from 'supertest'
import { server } from '../../../__resources__/config/test-server'
import { makeEquipmentDto } from './equipment.e2e-data'

const endpoint = '/equipment'

export const createEquipment = async (requestData?: any) => {
  return await request(server).post(endpoint).send(requestData)
}

export const getEquipment = async (equipmentId?: string) => {
  let uri = endpoint
  if (equipmentId) {
    uri = endpoint + '?id=' + equipmentId
  }
  return await request(server).get(uri)
}

export const updateEquipment = async (requestData: any, equipmentId: string) => {
  return await request(server)
    .patch(endpoint + '?id=' + equipmentId)
    .send(requestData)
}

export const updateEquipmentDtoUsecase = async (requestData: any) => {
  const model = faker.company.name() + faker.animal.type()
  const createData = makeEquipmentDto({ model })
  const result = await createEquipment(createData)

  return request(server).patch(`${endpoint}?id=${result.body.id}`).send(requestData)
}

export const deleteEquipment = async (equipmentId: string) => {
  return await request(server).delete(endpoint + '?id=' + equipmentId)
}