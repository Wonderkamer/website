import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class ContactDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(500)
  message!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  phone?: string;

  @IsArray()
  @IsOptional()
  callMeBackPreferencesHours?: string[];

  @IsArray()
  @IsOptional()
  callMeBackPreferencesDays?: string[];
}
