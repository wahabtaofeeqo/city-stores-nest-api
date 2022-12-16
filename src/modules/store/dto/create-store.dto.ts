import {
    IsNotEmpty,
    IsString,
    MinLength,
    } from 'class-validator';

export class CreateStoreDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly location: string;

    @IsNotEmpty()
    @MinLength(12)
    readonly city_id: string;
}
