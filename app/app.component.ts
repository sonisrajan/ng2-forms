import { Component } from '@angular/core';
import {User} from './shared/models/user';

@Component({
  selector: 'my-app',
  template:`
   <!--
   <h2>Template Form</h2>
   <template-form></template-form>
   -->
   <reactive-form></reactive-form>
  `,
  styleUrls: [`./app/app.component.css`]
})
export class AppComponent {
    message:string="hello";
   

}
