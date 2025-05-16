import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Resource } from '../model/resource.entity';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService extends BaseService<Resource> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/resources';
  }
}
