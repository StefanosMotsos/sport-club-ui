import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MemberFilters, MemberInsertDTO, MemberReadOnlyDTO, MemberUpdateDTO, Page} from '../interfaces/member';
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

  membersList(pageNumber: number, filters?: MemberFilters) {
    let params = new HttpParams()
      .set('page', pageNumber)
      .set("size", 5);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          if (key === 'deleted') return
          params = params.set(key, String(value))
        }
      })
    }

    return this.http.get<Page<MemberReadOnlyDTO>>(`${API_URL}`, { params });
  }

  deleteMember(uuid: string) {
    return this.http.delete<MemberReadOnlyDTO>(`${API_URL}/${uuid}`);
  }

  getMember(uuid: string) {
    return this.http.get<MemberReadOnlyDTO>(`${API_URL}/${uuid}`);
  }

  editMember(member: MemberUpdateDTO) {
    return this.http.put<MemberReadOnlyDTO>(`${API_URL}/${member.uuid}`, member);
  }
}
