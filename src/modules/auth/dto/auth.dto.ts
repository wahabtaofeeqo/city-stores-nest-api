import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
IsNotEmpty,
IsEmail,
IsString,
Length,
MinLength,
} from 'class-validator';

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @ApiProperty({example: 'tao@yahoo.com'})
    readonly email: string;

    @Length(6)
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;
}

export class GoogleIDDTO {    
    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty()
    readonly google_id: string;
}

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @Length(6)
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;
}

export class GoogleRegDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty()
    readonly google_id: string;
}

export class PasswordResetDTO {

    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty()
    readonly code: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    readonly password: string;
}

export class EmailDTO {
    @IsString()
    @ApiProperty()
    readonly email: string;
}
