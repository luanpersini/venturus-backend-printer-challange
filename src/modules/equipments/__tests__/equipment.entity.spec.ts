import * as uuid from 'uuid'

import { faker } from '@faker-js/faker'
import { EquipmentDto } from '../domain/dto/equipment.dto'
import { Equipment } from '../domain/entities/equipment.entity'
import { makeEquipmentDto } from './equipment.test-data'

const randomUuid = faker.datatype.uuid()
let equipmentDto: EquipmentDto

jest.mock('uuid')

describe('Domain :: Entities :: Equipment', () => {
  beforeEach(async () => {
    equipmentDto = makeEquipmentDto()  
  })

  test('should return an Equipment instance on success', () => {
    const equipment = new Equipment(equipmentDto)

    expect(equipment).toBeInstanceOf(Equipment)
  })
  
  test('should return an Equipment with an uuid when id is not provided', () => {
    jest.spyOn(uuid, 'v4').mockImplementationOnce(() => randomUuid)
    
    const equipment = new Equipment(equipmentDto)

    expect(equipment.id).toEqual(randomUuid)
  })

  test('should return an Equipment with the given id when its provided', () => {
    const id =  'anyId'
    const data = {...equipmentDto, id}
    const equipment = new Equipment(data)

    expect(equipment.id).toEqual(id)
  })
  
})