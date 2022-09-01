import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'
import { EnumCategory } from '../enums/EnumCategory'

export class EquipmentUpdateDto {
 
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  model: string

  @IsString() 
  @IsNotEmpty()
  @IsEnum(EnumCategory) 
  @IsOptional()
  category: string

  @IsInt()
  @Min(0)
  @Max(999999)
  @IsOptional()
  ppm: number

  @IsBoolean()
  @IsOptional()
  wifi: boolean

  @Min(0)
  @Max(999999)
  @IsOptional()
  consumption: number
}