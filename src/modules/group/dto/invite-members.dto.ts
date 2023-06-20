import { IsArray } from 'class-validator';

export class InviteMembersDto {
  @IsArray()
  emails: string[];
}
