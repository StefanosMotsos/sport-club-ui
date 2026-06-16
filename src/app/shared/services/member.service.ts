import {inject, Injectable, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MemberInsertDTO, MemberReadOnlyDTO} from '../interfaces/member';
import {environment} from '../../../environments/environment.development';

const API_URL = `${environment.apiURL}/api/v1/members`;

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  http = inject(HttpClient)

  registerMember(member: MemberInsertDTO) {
    return this.http.post<MemberReadOnlyDTO>(`${API_URL}`, member);
  }

  addFile(uuid: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${API_URL}/${uuid}/membership-file`, formData);
  }
}
