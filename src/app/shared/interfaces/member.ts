import {UserFields} from './user-login';

export interface PersonalInfoInsertDTO {
  membershipId: string;       // 11-digit string, e.g. "12345678901"
  identityNumber: string;
  placeOfBirth: string;
  branchOfRegistration: string;
}

export interface MemberInsertDTO {
  firstname: string;
  lastname: string;
  vat?: string;                // optional, 9+ digit string if present
  sportId: number;
  membershipTypeId: number;
  userInsertDTO: UserFields;   // { username, password, roleId } - your existing UserInsertDTO shape
  personalInfoInsertDTO: PersonalInfoInsertDTO;
}

export interface MemberReadOnlyDTO {
  uuid: string;
  firstname: string;
  lastname: string;
  vat: string;
  sport: string;            // sport NAME (string), not sportId
  membershipType: string;   // membership type NAME (string), not membershipTypeId
  activity: string;         // likely "ACTIVE" | "INACTIVE" or similar enum-as-string
  identityNumber: string;
  membershipId: string;
  username: string;
}
