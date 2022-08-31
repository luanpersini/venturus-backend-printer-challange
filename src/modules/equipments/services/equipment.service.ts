import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { ItemAlreadyExistsError } from 'src/presentation/errors/itemAlreadyExists.error'
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

  public async create(dto: EquipmentDto) {    
    const equipment = new Equipment(dto)
       
    if(await this.equipmentRepository.equipmentExists(equipment)){
      throw new BadRequestException(new ItemAlreadyExistsError('Equipment', 'Model and Category'))
    }
   
    const result = await this.equipmentRepository.createEquipment(equipment)
    console.log(`Equipment: Equipment [id: ${result.id}] [model: ${result.model}] created `)   
    return result 
  }

  public async listAllEquipments(): Promise<Equipment[]> {    
    const result = await this.equipmentRepository.getAllEquipments()    
    return result   
  }
}
