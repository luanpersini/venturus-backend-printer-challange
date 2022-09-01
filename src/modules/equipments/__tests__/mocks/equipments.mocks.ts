import { IEquipmentRepository } from '@modules/equipments/domain/interfaces/equipment-repository'

export const equipmentRepositoryMock: IEquipmentRepository = {
  createEquipment: jest.fn(),
  getAllEquipments: jest.fn(),
  getEquipmentById: jest.fn(),
  updateEquipment: jest.fn(),
  deleteEquipmentById: jest.fn(),
  equipmentExists: jest.fn()
}