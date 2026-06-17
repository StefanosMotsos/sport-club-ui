import {UserFields} from './user-login';

export interface PersonalInfoInsertDTO {
  membershipId: string;
  identityNumber: string;
  placeOfBirth: string;
  branchOfRegistration: string;
}

export interface MemberInsertDTO {
  firstname: string;
  lastname: string;
  vat?: string;
  sportId: number;
  membershipTypeId: number;
  userInsertDTO: UserFields;
  personalInfoInsertDTO: PersonalInfoInsertDTO;
}

export interface MemberReadOnlyDTO {
  uuid: string;
  firstname: string;
  lastname: string;
  vat: string;
  sport: string;
  membershipType: string;
  activity: string;
  identityNumber: string;
  membershipId: string;
  username: string;
}

export interface MemberFilters {
  vat?: string;
  membershipId?: string;
  lastname?: string;
  deleted?: boolean;
  sport?: string;
  activity?: string;
}

export interface Page<MemberReadOnlyDTO> {
  content: MemberReadOnlyDTO[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
