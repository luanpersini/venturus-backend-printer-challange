import { EquipmentUpdateDto } from '@modules/equipments/domain/dto/equipment-update.dto'
import { Equipment } from '@modules/equipments/domain/entities/Equipment'
import { IEquipmentRepository } from '@modules/equipments/domain/interfaces/equipment-repository'
import { Injectable } from '@nestjs/common'
import { EquipmentModel } from '../models/equipment.model'

@Injectable()
export class EquipmentRepository implements IEquipmentRepository {
  public async createEquipment(equipment: Equipment): Promise<Equipment> {
    const result = await EquipmentModel.create({ ...equipment })
    return new Equipment(result)
  }

  public async getAllEquipments(): Promise<Equipment[]> {
    const result = await EquipmentModel.findAll({})

    return result.map((equip) => {
      return new Equipment(equip)
    })
  }

  public async getEquipmentById(id: string): Promise<Equipment> {
    const result = await EquipmentModel.findOne({ where: { id } })
    if (!result) {
      return null
    }
    return new Equipment(result)
  }

  public async updateEquipment(id: string, updateData: EquipmentUpdateDto): Promise<Equipment> {
    const equipment = await EquipmentModel.findOne({
      where: { id }
    })
    if (!equipment) {
      return null
    }
    const result = await equipment.update({ ...updateData })
    return new Equipment(result)
  }

  public async deleteEquipmentById(id: string): Promise<number> {
    return await EquipmentModel.destroy({ where: { id } })
  }

  public async equipmentExists(model: string, category: string): Promise<boolean> {
    return (await EquipmentModel.count({ where: { model, category } })) > 0
  }
}
