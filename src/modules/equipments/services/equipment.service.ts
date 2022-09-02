import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { ConsoleLogger } from '@nestjs/common/services'
import { errorMessages } from '@presentation/errors/error-messages'
import { ItemAlreadyExistsError } from '@presentation/errors/item-already-exists.error'
import { EquipmentUpdateDto } from '../domain/dto/equipment-update.dto'
import { EquipmentDto } from '../domain/dto/equipment.dto'
import { Equipment } from '../domain/entities/equipment.entity'
import { IEquipmentRepository } from '../domain/interfaces/equipment-repository'
import { IEquipmentService } from '../domain/interfaces/equipment-service'

@Injectable()
export class EquipmentService implements IEquipmentService {
  constructor(
    @Inject('IEquipmentRepository')
    private readonly equipmentRepository: IEquipmentRepository,
    @Inject('ConsoleLogger')
    private readonly logger: ConsoleLogger
  ) {}

  public async createEquipment(equipmentData: EquipmentDto): Promise<Equipment> {
    this.logger.log(`Create Equipment: Starting process for equipment [${JSON.stringify(equipmentData)}]`)
    const equipment = new Equipment(equipmentData)

    await this.checkIfEquipmentExists(equipment.model, equipment.category)

    const result = await this.equipmentRepository.createEquipment(equipment)
    this.logger.log(`Create Equipment: Equipment [id: ${result.id}] [model: ${result.model}] created.`)
    return result
  }

  public async listEquipments(id: string): Promise<Equipment[]> {
    if (!id) {
      return await this.equipmentRepository.getAllEquipments()
    }

    const equipment = await this.equipmentRepository.getEquipmentById(id)

    if (!equipment) {
      this.logger.error(`List Equipment: Equipment with [id: ${id}] not found.`)
      throw new BadRequestException(errorMessages.equipmentNotFound)
    }

    return [equipment]
  }

  public async updateEquipment(id: string, updateData: EquipmentUpdateDto): Promise<Equipment> {
    this.logger.log(`Update Equipment: Starting process for equipment [id: ${id}]`)

    if (Object.keys(updateData).length === 0) {
      this.logger.error(`Update Equipment: ${errorMessages.noDataProvided}`)
      throw new BadRequestException(errorMessages.noDataProvided)
    }

    const equipment = await this.equipmentRepository.getEquipmentById(id)

    if (!equipment) {
      this.logger.error(`Update Equipment: Equipment with [id: ${id}] not found.`)
      throw new BadRequestException(errorMessages.equipmentNotFound)
    }

    if ((updateData.model && equipment.model != updateData.model) || (updateData.category && equipment.category != updateData.category)) {
      const model = updateData.model ? updateData.model : equipment.model
      const category = updateData.category ? updateData.category : equipment.category
      await this.checkIfEquipmentExists(model, category)
    }

    const result = await this.equipmentRepository.updateEquipment(id, updateData)
    this.logger.log(`Update Equipment: Equipment [id: ${result.id}] updated.`)
    return result
  }

  public async deleteEquipment(id: string): Promise<void> {
    this.logger.log(`Delete Equipment: Starting process for equipment [id: ${id}]`)
    const result = await this.equipmentRepository.deleteEquipmentById(id)

    if (result === 0) {
      this.logger.error(`Delete Equipment: Equipment with [id: ${id}] not found.`)
      throw new BadRequestException(errorMessages.equipmentNotFound)
    }

    this.logger.log(`Delete Equipment: Equipment [id: ${id}] deleted.`)
  }

  private async checkIfEquipmentExists(model: string, category: string): Promise<void> {
    if (await this.equipmentRepository.equipmentExists(model, category)) {
      this.logger.error(`Equipment with [Model: ${model}] and [Category: ${category}] already exists.`)
      throw new BadRequestException(new ItemAlreadyExistsError('Equipment', 'Model and Category'))
    }
  }
}
