import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from 'ng-chat';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ChatEngineService {

  constructor(private http: HttpClient, private service: RxStompService) {
  }

  public sendMessage(message: Message) {
    this.service.publish({destination: '/chat/request', body: JSON.stringify(message)});
  }

  public subscribeByUser(userId: string) {
    return this.service.watch(`/secure/user/${userId}/chat/send`);
  }

  public messageHistory(fromUser: string, toUser: string) {
    let params = new HttpParams();
    params = params.append('fromId', fromUser);
    params = params.append('toId', toUser);
    return this.http.get<Message[]>(`${environment.restApi}/message/history/byUser`, {
      params: params,
      observe: 'response'
    });
  }

}
