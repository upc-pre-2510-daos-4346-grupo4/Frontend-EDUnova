import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Objective} from '../model/objective.entity';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesService extends BaseService<Objective> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/objectives';
  }
}
