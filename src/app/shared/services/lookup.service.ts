import {inject, Injectable, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LookupReadOnlyDTO} from '../interfaces/lookup';
import {environment} from '../../../environments/environment.development';

const API_URL = `${environment.apiURL}/api/v1/lookup`;

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  http = inject(HttpClient)

  getAllSports() {
    return this.http.get<LookupReadOnlyDTO[]>(`${API_URL}/sports`);
  }

  getAllTypes() {
    return this.http.get<LookupReadOnlyDTO[]>(`${API_URL}/membership-types`);
  }
}
