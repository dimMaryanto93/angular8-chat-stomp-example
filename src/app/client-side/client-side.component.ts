import {Component, OnInit} from '@angular/core';
import {UsersService} from '../service/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatEngineService} from '../service/chat-engine.service';
import {Message} from 'ng-chat';
import {UsersModel} from '../model/users.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.component.html',
  styleUrls: ['./client-side.component.css']
})
export class ClientSideComponent implements OnInit {

  formGroup: FormGroup;
  historyMessage: Message[] = [];
  listUsers: UsersModel[] = [{id: 'primajatnika271995@gmail.com', avatar: null, displayName: 'Prima', status: null, participantType: null}];

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private chatService: ChatEngineService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      toId: this.formBuilder.control(this.userService.admin.id),
      fromId: this.formBuilder.control('', [Validators.required]),
      message: this.formBuilder.control('')
    });
    this.userService.listFriends().subscribe((resp: HttpResponse<UsersModel[]>) => {
      this.listUsers = resp.body;
    });
  }

  sendMessage($event: Event) {
    const message: Message = this.formGroup.value;
    message.dateSent = new Date();
    this.historyMessage.push(message);
    this.chatService.sendMessage(message);
    this.formGroup.reset();
    this.formGroup.patchValue({
      toId: this.userService.admin.id,
      fromId: message.fromId
    });
  }

  selectedChangeFrom(event: Event) {
    this.historyMessage = [];
    const message: Message = this.formGroup.value;
    console.log('message from ', message.fromId);
    if (message.fromId) {
      this.chatService.subscribeByUser(message.fromId).subscribe(response => {
        const data: Message = JSON.parse(response.body);
        this.historyMessage.push(data);
      });
    }
  }
}
