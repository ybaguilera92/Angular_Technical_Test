import { Component } from '@angular/core';
import { EncryptionService } from './services/encryption.service';
import { EnviromentsService } from './services/enviroments.service';
import { environment } from "../environments/environment";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material';
  constructor(
    private _enviroments: EnviromentsService,
    private _encryptionService: EncryptionService

  ) {  
    this._enviroments.initEnvironment(environment);
    this._encryptionService.initServiceEnvironment(environment);    

  }

}
