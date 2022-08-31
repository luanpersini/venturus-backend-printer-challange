import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { EquipmentDto } from '../domain/dto/equipment.dto'
import { Equipment } from '../domain/entities/Equipment'
import { IEquipmentService } from '../domain/interfaces/equipment-service'

@Controller('equipment')
export class EquipmentController {
  constructor(
    @Inject('IEquipmentService')
    private readonly equipmentService: IEquipmentService
  ) {}

  @Post()
  async create(@Body() body: EquipmentDto): Promise<Equipment> {
    return await this.equipmentService.create(body)
  }

  @Get()
  async listAllEquipments(): Promise<Equipment[]> {
    return await this.equipmentService.listAllEquipments()
  }

  
}
