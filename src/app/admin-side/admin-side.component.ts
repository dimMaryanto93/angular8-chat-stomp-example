import {Component, OnInit, ViewChild} from '@angular/core';
import {IChatController, IChatParticipant, PagedHistoryChatAdapter} from 'ng-chat';
import {ChatAdapterStomp} from '../service/chat-adapter-stomp';
import {UsersService} from '../service/users.service';

@Component({
  selector: 'app-admin-side',
  templateUrl: './admin-side.component.html',
  styleUrls: ['./admin-side.component.css']
})
export class AdminSideComponent implements OnInit {

  @ViewChild('ngChatInstance', {static: false})
  protected ngChatInstance: IChatController;
  triggeredEvents = [];
  adapter: PagedHistoryChatAdapter;

  constructor(adapter: ChatAdapterStomp, public userService: UsersService) {
    this.adapter = adapter;
  }

  ngOnInit(): void {
  }

  onEventTriggered(event: string): void {
    this.triggeredEvents.push(event);
  }

  onMessageOpened(event: IChatParticipant) {
    console.log(event);
  }
}
