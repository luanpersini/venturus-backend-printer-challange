import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions'
import { errorMessages } from '@presentation/errors/error-messages'
import { ItemAlreadyExistsError } from '@presentation/errors/item-already-exists.error'
import { EquipmentUpdateDto } from '../domain/dto/equipment-update.dto'
import { EquipmentDto } from '../domain/dto/equipment.dto'
import { Equipment } from '../domain/entities/Equipment'
import { IEquipmentRepository } from '../domain/interfaces/equipment-repository'
import { IEquipmentService } from '../domain/interfaces/equipment-service'

@Injectable()
export class EquipmentService implements IEquipmentService {
  constructor(
    @Inject('IEquipmentRepository')
    private readonly equipmentRepository: IEquipmentRepository
  ) {}

  public async createEquipment(equipmentData: EquipmentDto): Promise<Equipment> {
    console.log(`Create Equipment: Starting process for equipment [${JSON.stringify(equipmentData)}]`)
    const equipment = new Equipment(equipmentData)

    await this.checkIfEquipmentExists(equipment.model, equipment.category)

    const result = await this.equipmentRepository.createEquipment(equipment)
    console.log(`Equipment: Equipment [id: ${result.id}] [model: ${result.model}] created.`)
    return result
  }
  
  public async listEquipments(id: string): Promise<Equipment[]> {
    if(!id) {
      return await this.equipmentRepository.getAllEquipments()
    }
    
    const equipment = await this.equipmentRepository.getEquipmentById(id)

    if (!equipment) {
      throw new NotFoundException(errorMessages.equipmentNotFound)
    }     
    
    return [equipment]
  }

  public async updateEquipment(id: string, updateData: EquipmentUpdateDto): Promise<Equipment> {
    console.log(`Update Equipment: Starting process for equipment [id: ${id}]`)

    const equipment = await this.equipmentRepository.getEquipmentById(id)

    if (!equipment) {
      throw new NotFoundException(errorMessages.equipmentNotFound)
    }
       
    if (updateData.model && updateData.category) {
      if (equipment.model != updateData.model && equipment.category != updateData.category) {
        await this.checkIfEquipmentExists(updateData.model, updateData.category)
      }
    }
    const result = await this.equipmentRepository.updateEquipment(id, updateData)
    console.log(`Update Equipment: Equipment [id: ${result.id}] updated.`)
    return result
  }

  public async deleteEquipment(id: string): Promise<void>  {
    console.log(`Delete Equipment: Starting process for equipment [id: ${id}]`)
    const result = await this.equipmentRepository.deleteEquipmentById(id)
    
    if(result === 0){      
      console.log(`Delete Equipment: Equipment with [id: ${id}] not found.`)
      throw new BadRequestException(errorMessages.equipmentNotFound)
    }  

    console.log(`Delete Equipment: Equipment [id: ${id}] deleted.`)  
  }

  private async checkIfEquipmentExists(model: string, category: string): Promise<void> {
    if (await this.equipmentRepository.equipmentExists(model, category)) {
      throw new BadRequestException(new ItemAlreadyExistsError('Equipment', 'Model and Category'))
    }
  }
}
