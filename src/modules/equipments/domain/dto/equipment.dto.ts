import { ApiProperty } from '@nestjs/swagger'
import { errorMessages } from '@presentation/errors/error-messages'
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'
import { EnumCategory } from '../enums/EnumCategory'

export class EquipmentDto {
  
  @ApiProperty({
    required: true,
    example: "Model One"    
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  model: string

  @ApiProperty({
    required: true,
    example: "toner",
    description: 'Pages per minute. Allowed values: "toner" or "cartucho"'      
  })
  @IsString() 
  @IsNotEmpty()
  @IsEnum(EnumCategory, {message: errorMessages.enumCategoryError}) 
  category: string

  @ApiProperty({
    required: false,
    example: 999999,
    description: 'Pages per minute. Allowed values: integer 0 to 999999'  
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999999)
  ppm: number

  @ApiProperty({
    required: false,
    example: true,
    description: 'Wifi conection. Allowed values: true or false'  
  })
  @IsOptional()
  @IsBoolean()
  wifi: boolean

  @ApiProperty({
    required: false,
    example: 999999,
    description: 'Power consumption. Allowed values: real number 0 to 999999'  
  })
  @IsOptional()
  @Min(0)
  @Max(999999)
  @IsNumber()
  consumption: number
}