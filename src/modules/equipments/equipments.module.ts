import { Module } from '@nestjs/common'
import { EquipmentController } from './api/equipment.controller'
import { EquipmentRepository } from './infra/repositories/equipment.repository'
import { EquipmentService } from './services/equipment.service'

@Module({
  imports: [],
  controllers: [EquipmentController],
  providers: [
    {
      provide: 'IEquipmentRepository',
      useClass: EquipmentRepository
    },
    {
      provide: 'IEquipmentService',
      useClass: EquipmentService
    }
  ],
  exports: []
})
export class EquipmentModule {}
