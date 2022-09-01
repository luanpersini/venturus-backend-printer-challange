/* eslint-disable @typescript-eslint/no-empty-function */

import { faker } from '@faker-js/faker'
import { BadRequestException } from '@nestjs/common'
import { errorMessages } from '@presentation/errors/error-messages'
import { ItemAlreadyExistsError } from '@presentation/errors/item-already-exists.error'
import * as uuid from 'uuid'
import { EquipmentDto } from '../domain/dto/equipment.dto'
import { Equipment } from '../domain/entities/equipment.entity'
import { IEquipmentRepository } from '../domain/interfaces/equipment-repository'
import { EquipmentService } from '../services/equipment.service'
import { equipment2, makeEquipmentDto, makeEquipmentRepositoryMock } from './equipments.test-data'

jest.mock('uuid')

let sut: EquipmentService
let equipment: Equipment
let equipmentDto: EquipmentDto
let equipmentRepositoryMock: IEquipmentRepository
let equipmentId: string

const randomUuid = faker.datatype.uuid()

const setupTest = () => {
  equipmentDto = makeEquipmentDto()
  equipment = new Equipment(equipmentDto)
  equipmentId = equipment.id
  equipmentRepositoryMock = makeEquipmentRepositoryMock(equipment)
  sut = new EquipmentService(equipmentRepositoryMock) 
  jest.spyOn(uuid, 'v4').mockImplementation(() => randomUuid)    
}

describe(`Equipment Service`, () => {
  beforeEach(() => { 
    setupTest()    
  })

  describe(`Create Equipment`, () => {
    const execSut = () => sut.createEquipment(equipmentDto)

    test('should return the created equipment on success', async () => {     
      jest.spyOn(equipmentRepositoryMock, 'createEquipment').mockResolvedValueOnce(equipment)
      const result = await execSut()

      expect(result).toBe(equipment)
    })

    test('should call checkIfEquipmentExists with right params', async () => {     
      const spy = jest.spyOn(sut as any, 'checkIfEquipmentExists')
      await execSut()

      expect(spy).toHaveBeenCalledWith(equipment.model, equipment.category)
    })

  }) //End Create Equipment

  describe(`List Equipments`, () => {
    const execSut = () => sut.listEquipments(equipmentId)

    test('should call equipmentRepository.getAllEquipments() if no equipmentId was provided', async () => {     
      equipmentId= undefined      
      await execSut()

      expect(equipmentRepositoryMock.getAllEquipments).toHaveBeenCalledTimes(1)
    })
    
    test('should return an array of Equipments if no equipmentId was provided', async () => {     
      equipmentId= undefined
      const result = await execSut()

      expect(result).toEqual([equipment, equipment2])
    })
    
    test('should call equipmentRepository.getEquipmentById() when an equipmentId is provided', async () => {     
      await execSut()

      expect(equipmentRepositoryMock.getEquipmentById).toHaveBeenCalledWith(equipmentId)
    })

    test('should throw Error if no Equipment with the given (equipmentId) was found', async () => {
      jest.spyOn(equipmentRepositoryMock, 'getEquipmentById').mockResolvedValueOnce(undefined)

      await expect(execSut()).rejects.toThrowError( new BadRequestException(errorMessages.equipmentNotFound))
    })

    test('should return an array with a sigle Equipment when an equipmentId is provided', async () => {          
      const result = await execSut()

      expect(result).toEqual([equipment])
    })

  }) //End List Equipments


  describe(`Update Equipment`, () => {
    const execSut = () => sut.updateEquipment(equipmentId, equipmentDto)

    test('should call equipmentRepository.getEquipmentById() with the correct params', async () => {     
      await execSut()

      expect(equipmentRepositoryMock.getEquipmentById).toHaveBeenCalledWith(equipmentId)
    })

    test('should throw Error if no Equipment with the given (equipmentId) was found', async () => {
      jest.spyOn(equipmentRepositoryMock, 'getEquipmentById').mockResolvedValueOnce(undefined)

      await expect(execSut()).rejects.toThrowError( new BadRequestException(errorMessages.equipmentNotFound))
    })
    
    test('should call checkIfEquipmentExists if equipment model or category is diferent from the original equipment data.', async () => {     
      equipmentDto.model = 'Diferent Model'      
      const spy = jest.spyOn(sut as any, 'checkIfEquipmentExists')
      await execSut()

      expect(spy).toHaveBeenCalledWith(equipmentDto.model, equipmentDto.category)
    })

    test('should call equipmentRepository.updateEquipment() with the correct params', async () => {     
      await execSut()

      expect(equipmentRepositoryMock.updateEquipment).toHaveBeenCalledWith(equipmentId, equipmentDto)
    })

    test('should return the updated Equipment on success', async () => {          
      const result = await execSut()

      expect(result).toEqual(equipment)
    })

  }) //End Update Equipment

  describe(`Delete Equipment`, () => {
    const execSut = () => sut.deleteEquipment(equipmentId)

    test('should call equipmentRepository.deleteEquipmentById() with the correct params', async () => {     
      await execSut()

      expect(equipmentRepositoryMock.deleteEquipmentById).toHaveBeenCalledWith(equipmentId)
    })

    test('should throw Error if no Equipment with the given (equipmentId) was found', async () => {
      jest.spyOn(equipmentRepositoryMock, 'deleteEquipmentById').mockResolvedValueOnce(0)

      await expect(execSut()).rejects.toThrowError( new BadRequestException(errorMessages.equipmentNotFound))
    }) 

  }) //End Delete Equipment


  describe(`EquipmentService.checkIfEquipmentExists`, () => {
    const execSut = () => (sut as any).checkIfEquipmentExists(equipment.model, equipment.category)

    test('should call equipmentRepository.equipmentExists() with the correct params', async () => {     
      await execSut()

      expect(equipmentRepositoryMock.equipmentExists).toHaveBeenCalledWith(equipment.model, equipment.category)
    })

    test('should throw Error if Equipment already exists (true)', async () => {
      jest.spyOn(equipmentRepositoryMock, 'equipmentExists').mockResolvedValueOnce(true)

      await expect(execSut()).rejects.toThrowError(new BadRequestException(new ItemAlreadyExistsError('Equipment', 'Model and Category')))
    })
    
  }) //End EquipmentService.checkIfEquipmentExists

})
