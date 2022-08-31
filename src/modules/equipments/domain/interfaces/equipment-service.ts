import { EquipmentDto } from '../dto/equipment.dto'
import { Equipment } from '../entities/Equipment'

export interface IEquipmentService {
  create(dto: EquipmentDto): Promise<Equipment>
  listAllEquipments (): Promise<Equipment[]>
}
