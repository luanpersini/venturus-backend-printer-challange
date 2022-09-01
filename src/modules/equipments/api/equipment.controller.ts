import { BadRequestException, Body, Controller, Delete, Get, Inject, Patch, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { errorMessages } from '@presentation/errors/error-messages'
import { EquipmentUpdateDto } from '../domain/dto/equipment-update.dto'
import { EquipmentDto } from '../domain/dto/equipment.dto'
import { EquipmentQueryDto, EquipmentQueryGetDto } from '../domain/dto/query-param.dto'
import { Equipment } from '../domain/entities/equipment.entity'
import { IEquipmentService } from '../domain/interfaces/equipment-service'

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(
    @Inject('IEquipmentService')
    private readonly equipmentService: IEquipmentService
  ) {}

  @ApiOperation({ summary: 'Create a new equipment.' })
  @Post()
  async createEquipment(@Body() body: EquipmentDto): Promise<Equipment> {
    return await this.equipmentService.createEquipment(body)
  }

  @ApiOperation({ summary: 'List equipments. Leave the equipment id empty to retun all records.' })
  @Get()
  async getEquipmentById(@Query() { id }: EquipmentQueryGetDto): Promise<Equipment[]> {
    return await this.equipmentService.listEquipments(id)
  }

  @ApiOperation({ summary: 'Update an equipment.' })
  @Patch()
  async updateEquipment(@Body() body: EquipmentUpdateDto, @Query() { id }: EquipmentQueryDto): Promise<Equipment> {
    if (Object.keys(body).length === 0) {
      throw new BadRequestException(errorMessages.noDataProvided)
    }

    return await this.equipmentService.updateEquipment(id, body)
  }

  @ApiOperation({ summary: 'Delete an equipment.' })
  @Delete()
  async deleteEquipment(@Query() { id }: EquipmentQueryDto): Promise<void> {
    return await this.equipmentService.deleteEquipment(id)
  }
}
