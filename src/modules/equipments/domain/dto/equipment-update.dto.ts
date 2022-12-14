import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'
import { EnumCategory } from '../enums/EnumCategory'

export class EquipmentUpdateDto { 
  @ApiProperty({
    required: false,
    example: "Model One"    
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  model: string

  @ApiProperty({
    required: false,
    example: "toner",
    description: 'Pages per minute. Allowed values: "toner" or "cartucho"'      
  })
  @IsString() 
  @IsNotEmpty()
  @IsEnum(EnumCategory)
  @IsOptional() 
  category: string

  @ApiProperty({
    required: false,
    example: 999999,
    description: 'Pages per minute. Allowed values: integer 0 to 999999'  
  })
  @IsInt()
  @Min(0)
  @Max(999999)
  @IsOptional()
  ppm: number

  @ApiProperty({
    required: false,
    example: true,
    description: 'Wifi conection. Allowed values: true or false'  
  })
  @IsBoolean()
  @IsOptional()
  wifi: boolean

  @ApiProperty({
    required: false,
    example: 999999,
    description: 'Power consumption. Allowed values: real number 0 to 999999'  
  })
  @Min(0)
  @Max(999999)
  @IsOptional()
  @IsNumber()
  consumption: number
}