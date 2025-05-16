import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Course} from '../model/course.entity';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseService<Course> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/courses';
  }
}
