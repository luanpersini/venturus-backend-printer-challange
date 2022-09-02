import { equipmentDtoParams, equipmentUpdateDtoParams, makeDtoParams, makeEquipmentDto } from './equipment.e2e-data'

import { faker } from '@faker-js/faker'
import { Equipment } from '@modules/equipments/domain/entities/equipment.entity'
import { errorMessages } from '@presentation/errors/error-messages'
import { ItemAlreadyExistsError } from '@presentation/errors/item-already-exists.error'
import { app, initServer } from '@tests/__resources__/config/test-server'
import { makeDtoTestParams } from '@tests/__resources__/testHelpers/dtoTestParamsFactory'
import { standardDtoTests } from '@tests/__resources__/testHelpers/standardDtoTests'
import { createEquipment, deleteEquipment, getEquipment, updateEquipment, updateEquipmentDtoUsecase } from './equipment.usecases'

jest.setTimeout(30000)

//Create the raw array with the rules of the DTO params
const createDtoParams = makeDtoParams(equipmentDtoParams)
//Create the organized array with the rules of the DTO params to be used in the standardDtoTests
const equipmentDtoTestParams = makeDtoTestParams(createDtoParams)

const createDtoUpdateParams = makeDtoParams(equipmentUpdateDtoParams)
const equipmentUpdateDtoTestParams = makeDtoTestParams(createDtoUpdateParams)

let requestData: any
let equipment: Equipment

const randomUuid = faker.datatype.uuid()

const createTestEquipment = async () => {
  const { status: statusCreate, body } = await createEquipment(requestData)
  expect(statusCreate).toBe(201)
  return body
}

describe('Equipment End-To-End Tests', () => {
  beforeEach(async () => {
    await initServer()
    const model = faker.company.name() + faker.animal.type()
    requestData = makeEquipmentDto({ model })
  })
  afterEach(async () => {
    await app.close()
  })

  describe('Business Rules', () => {
    describe('POST /equipment', () => {
      test('should return **OK** with the created equipment on success', async () => {
        const { status, body } = await createEquipment(requestData)
        expect(status).toBe(201)
        expect(body).toEqual(
          expect.objectContaining({
            ...requestData,
            id: expect.any(String)
          })
        )
      })

      test('should return **BadRequest** if an equipment with the given (model and category) already exist in the database.', async () => {
        await createTestEquipment()

        const { status, body } = await createEquipment(requestData)
        expect(body.message).toBe(new ItemAlreadyExistsError('Equipment', 'Model and Category').message)
        expect(status).toBe(400)
      })
    }) // End POST /equipment

    describe('GET /equipment and GET /equipment?id={id}', () => {
      beforeEach(async () => {
        equipment = await createTestEquipment()
      })

      test('should return **OK** with a List of all Equipments when equipmentId is not provided', async () => {
        requestData.model = faker.company.name()
        const { body: equipment2 } = await createEquipment(requestData)

        const { status, body } = await getEquipment()
        expect(status).toBe(200)
        expect(body).toEqual([equipment, equipment2])
      })

      test('should return **OK** with an array with one Equipment when equipmentId is provided', async () => {
        const { status, body } = await getEquipment(equipment.id)
        expect(status).toBe(200)
        expect(body).toEqual([equipment])
      })

      test('should return **BadRequest** if an equipment with the given (id) was not found.', async () => {
        const { status, body } = await getEquipment(randomUuid)

        expect(body.message).toBe(errorMessages.equipmentNotFound)
        expect(status).toBe(400)
      })
    }) // End GET /equipment

    describe('Patch /equipment?id={id}', () => {
      beforeEach(async () => {
        equipment = await createTestEquipment()
      })

      test('should return **OK** with the updated equipment on success', async () => {
        const model = 'New Model'

        const { status, body } = await updateEquipment({ model }, equipment.id)
        expect(status).toBe(200)
        expect(body).toEqual(
          expect.objectContaining({
            ...equipment,
            model
          })
        )
      })

      test('should return **BadRequest** if an equipment with the given (id) was not found.', async () => {
        const { status, body } = await updateEquipment(requestData, randomUuid)

        expect(body.message).toBe(errorMessages.equipmentNotFound)
        expect(status).toBe(400)
      })

      test('should return **BadRequest** if an equipment with the given (model and category) already exist in the database when updating.', async () => {
        //Arrange - Create equipment with same data as updateData
        const updateData = { model: 'ModelExists', category: 'toner' }
        const { status: statusCreate, body: equipmentToBeCompared } = await createEquipment(updateData)
        expect(statusCreate).toBe(201)
        expect(equipmentToBeCompared.model).toEqual(updateData.model)
        expect(equipmentToBeCompared.category).toEqual(updateData.category)

        //Act
        const { status, body } = await updateEquipment(updateData, equipment.id)

        //Assert
        expect(body.message).toBe(new ItemAlreadyExistsError('Equipment', 'Model and Category').message)
        expect(status).toBe(400)
      })
    }) // End Patch /equipment

    describe('DELETE /equipment?id={id}', () => {
      beforeEach(async () => {
        equipment = await createTestEquipment()
      })

      test('should return **BadRequest** if an equipment with the given (id) was not found.', async () => {
        const { status, body } = await deleteEquipment(randomUuid)

        expect(body.message).toBe(errorMessages.equipmentNotFound)
        expect(status).toBe(400)
      })

      test('should return **OK** if Equipment was successfuly deleted.', async () => {
        const { status, body } = await deleteEquipment(equipment.id)
        expect(status).toBe(200)
        expect(body).toEqual({})
      })
    }) // End DELETE /equipment
  }) // End Business Rules

  describe('Dto Validation', () => {
    //Validate the Dto Properties
    describe('EquipmentDto test (used in POST /equipment)', () => {
      standardDtoTests(equipmentDtoTestParams, makeEquipmentDto, createEquipment, {}, { okStatus: 201 })
    })

    describe('EquipmentUpdateDto test (used in PATCH /equipment)', () => {
      standardDtoTests(equipmentUpdateDtoTestParams, makeEquipmentDto, updateEquipmentDtoUsecase, {}, { okStatus: 200 })
    })

    describe('EquipmentQueryDto and EquipmentQueryGetDto - used in GET, PATCH and DELETE)', () => {
      test('should return **BadRequest** if the given (id) is not an UUID.', async () => {
        const { status, body } = await updateEquipment(requestData, 'not_an_uuid')

        expect(body.message).toBe('id must be a UUID')
        expect(status).toBe(400)
      })
    })
  }) // End Dto validation
})
