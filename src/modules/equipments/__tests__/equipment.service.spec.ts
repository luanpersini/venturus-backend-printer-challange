/* eslint-disable @typescript-eslint/no-empty-function */

import { faker } from '@faker-js/faker'
import * as uuid from 'uuid'
import { Equipment } from '../domain/entities/Equipment'
import { EquipmentService } from '../services/equipment.service'
import { equipmentRepositoryMock } from './mocks/equipments.mocks'

jest.mock('uuid')


let sut: EquipmentService
let equipment: Equipment

const equipmentDto = {  
  model: "Model PTW",
  category: "toner",
  wifi: true,
  ppm: 33355,  
  consumption: 16.7
}

const randomUuid = faker.datatype.uuid()

const makeSut = () => {
  sut = new EquipmentService(equipmentRepositoryMock) 
  jest.spyOn(uuid, 'v4').mockImplementation(() => randomUuid)
}

describe(`Equipment Service`, () => {
  beforeEach(() => { 
    makeSut()
    equipment = new Equipment(equipmentDto)
  })

  describe(`Create Equipment`, () => {
    const execSut = () => sut.createEquipment(equipmentDto)

    test('should return the created equipment on success', async () => {     
      jest.spyOn(equipmentRepositoryMock, 'createEquipment').mockResolvedValueOnce(equipment)
      const result = await execSut()

      expect(result).toBe(equipment)
    })
  }) //End Create Equipment

})
