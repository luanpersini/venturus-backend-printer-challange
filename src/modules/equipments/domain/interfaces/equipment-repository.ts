import { Equipment } from '../entities/Equipment'

export interface IEquipmentRepository {
  createEquipment(equipment: Equipment): Promise<Equipment>
  updateEquipment(equipment: Equipment): Promise<void>
  getAllEquipments(): Promise<Equipment[]>  
  deleteEquipmentById(id: string): Promise<number>  
  equipmentExists(equipment: Equipment): Promise<boolean>

}
