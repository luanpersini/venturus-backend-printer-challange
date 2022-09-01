import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
export class EquipmentQueryGetDto {
  @ApiProperty({
    required: false,
    example: "00000000-0000-0000-0000-000000000000",
    description: 'equipment id'  
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  @IsOptional()
  id: string
}

export class EquipmentQueryDto {
  @ApiProperty({
    required: true,
    example: "00000000-0000-0000-0000-000000000000",
    description: 'equipment id'  
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id: string
}