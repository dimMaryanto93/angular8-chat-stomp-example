import {ChatParticipantStatus, ChatParticipantType} from 'ng-chat';

export class UsersModel {
  public id: string;
  public displayName: string;
  participantType: ChatParticipantType;
  status: ChatParticipantStatus;
  avatar: string | null;
}
