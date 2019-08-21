import {ChatParticipantStatus, ChatParticipantType, IChatParticipant, Message, PagedHistoryChatAdapter, ParticipantResponse} from 'ng-chat';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';
import {UsersService} from './users.service';
import {ChatEngineService} from './chat-engine.service';
import {UsersModel} from '../model/users.model';

@Injectable({
  providedIn: 'root'
})
export class ChatAdapterStomp extends PagedHistoryChatAdapter {

  private messages: Message[] = [];
  private listFriendsUser: UsersModel[] = [];

  constructor(private userService: UsersService, private chatService: ChatEngineService) {
    super();
  }

  mockedParticipants: IChatParticipant[] = [
    {
      participantType: ChatParticipantType.User,
      id: 'primajatnika271995@gmail.com',
      displayName: 'Prima',
      avatar: 'https://66.media.tumblr.com/avatar_9dd9bb497b75_128.pnj',
      status: ChatParticipantStatus.Online
    }];

  listFriends(): Observable<ParticipantResponse[]> {
    return of(this.mockedParticipants.map(user => {
      const participantResponse = new ParticipantResponse();

      participantResponse.participant = user;
      participantResponse.metadata = {
        totalUnreadMessages: Math.floor(Math.random() * 10)
      };

      return participantResponse;
    }));
  }

  getMessageHistory(toUserId: any): Observable<Message[]> {
    return of([]);
  }

  sendMessage(message: Message): void {
    this.chatService.sendMessage(message);
  }

  getMessageHistoryByPage(toUserId: any, size: number, page: number): Observable<Message[]> {
    const historyMessages: Message[] = [];
    const admin = this.userService.admin;

    this.chatService.subscribeByUser(admin.id).subscribe(response => {
      const jsonObject: Message = JSON.parse(response.body);
      console.log('watch message', jsonObject);
      const userRecieved = this.mockedParticipants.find(user => user.id === jsonObject.fromId);
      this.onMessageReceived(userRecieved, jsonObject);
    }, error => {
      console.log('error subscribe ', error);
    });

    console.log(`${toUserId} size ${size} page ${page}`, historyMessages);
    return of(historyMessages).pipe(delay(1000));
  }

}
