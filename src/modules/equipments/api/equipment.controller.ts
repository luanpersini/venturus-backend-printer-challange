import { BadRequestException, Body, Controller, Delete, Get, Inject, Patch, Post, Query } from '@nestjs/common'
import { errorMessages } from '@presentation/errors/error-messages'
import { EquipmentUpdateDto } from '../domain/dto/equipment-update.dto'
import { EquipmentDto } from '../domain/dto/equipment.dto'
import { EquipmentQueryParamDto } from '../domain/dto/query-param.dto'
import { Equipment } from '../domain/entities/equipment.entity'
import { IEquipmentService } from '../domain/interfaces/equipment-service'

@Controller('equipment')
export class EquipmentController {
  constructor(
    @Inject('IEquipmentService')
    private readonly equipmentService: IEquipmentService
  ) {}

  @Post()
  async createEquipment(@Body() body: EquipmentDto): Promise<Equipment> {
    return await this.equipmentService.createEquipment(body)
  }

  @Get()
  async getEquipmentById(@Query() { id }: EquipmentQueryParamDto): Promise<Equipment[]> {
    return await this.equipmentService.listEquipments(id)
  }

  @Patch()
  async updateEquipment(@Body() body: EquipmentUpdateDto, @Query() { id }: EquipmentQueryParamDto): Promise<Equipment> {
    if (Object.keys(body).length === 0) {
      throw new BadRequestException(errorMessages.noDataProvided)
    }

    return await this.equipmentService.updateEquipment(id, body)
  }

  @Delete()
  async deleteEquipment(@Query() { id }: EquipmentQueryParamDto): Promise<void> {
    return await this.equipmentService.deleteEquipment(id)
  }
}
