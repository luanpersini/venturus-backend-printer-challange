import { EquipmentDto } from '../dto/equipment.dto'
import { Equipment } from '../entities/Equipment'

export interface IEquipmentRepository {
  createEquipment(equipment: Equipment): Promise<Equipment>
  updateEquipment(id: string, updateData: EquipmentDto): Promise<Equipment>
  getAllEquipments(): Promise<Equipment[]>
  getEquipmentById(id: string): Promise<Equipment>
  deleteEquipmentById(id: string): Promise<number>  
  equipmentExists(model: string, category: string): Promise<boolean>
}
