import { EquipmentDto } from '../dto/equipment.dto'
import { Equipment } from '../entities/Equipment'

export interface IEquipmentService {
  createEquipment(equipmentData: EquipmentDto): Promise<Equipment>
  listEquipments (id: string): Promise<Equipment[]>  
  updateEquipment(id: string, data: EquipmentDto): Promise<Equipment>
  deleteEquipment(id: string): Promise<void>
}
