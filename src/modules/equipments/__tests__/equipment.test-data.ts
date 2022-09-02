import { Equipment } from '../domain/entities/equipment.entity'

export const makeEquipmentDto = (params?: any) => ({  
  model: "Model PTW",
  category: "toner",
  wifi: true,
  ppm: 33355,  
  consumption: 16.7
})
export const equipment2 = new Equipment(makeEquipmentDto({model: 'Model Equip two', category: 'toner'}))

export const makeEquipmentRepositoryMock = (equipment: Equipment) => ({
  createEquipment: jest.fn(() => Promise.resolve(equipment)),
  getAllEquipments: jest.fn(() => Promise.resolve([equipment, equipment2])),
  getEquipmentById: jest.fn(() => Promise.resolve(equipment)),
  updateEquipment: jest.fn(() => Promise.resolve(equipment)),
  deleteEquipmentById: jest.fn(() => Promise.resolve(1)),
  equipmentExists: jest.fn(() => Promise.resolve(false))
})