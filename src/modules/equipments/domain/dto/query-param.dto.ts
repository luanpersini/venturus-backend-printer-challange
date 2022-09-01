import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
export class EquipmentQueryParamDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  @IsOptional()
  id: string
}