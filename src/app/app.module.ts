import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {stompConfig} from './service/socket-provider.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NgChatModule} from 'ng-chat';
import {HttpClientModule} from '@angular/common/http';
import {ClientSideComponent} from './client-side/client-side.component';
import {AdminSideComponent} from './admin-side/admin-side.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientSideComponent,
    AdminSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChatModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: stompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
