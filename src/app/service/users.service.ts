import {Injectable} from '@angular/core';
import {ChatParticipantStatus, ChatParticipantType, IChatParticipant} from 'ng-chat';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UsersModel} from '../model/users.model';

@Injectable({providedIn: 'root'})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  public admin: IChatParticipant = {
    participantType: ChatParticipantType.User,
    id: 'admin',
    displayName: 'Admin',
    avatar: null,
    status: ChatParticipantStatus.Online
  };

  listFriends() {
    let params = new HttpParams();
    params = params.append('admin', 'false');
    return this.http.get(
      `${environment.restApi}/users/list`,
      {params: params, observe: 'response'}
    );
  }

  findById(userId: string) {
    return this.http.get<UsersModel>(
      `${environment.restApi}/users/${userId}/user`,
      {observe: 'response'}
    );
  }

}
