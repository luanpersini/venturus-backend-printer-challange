import { Module } from '@nestjs/common'
import { PresentationModule } from '@presentation/presentation.module'
import { EquipmentController } from './api/equipment.controller'
import { EquipmentRepository } from './infra/equipment.repository'
import { EquipmentService } from './services/equipment.service'

@Module({
  imports: [PresentationModule],
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
