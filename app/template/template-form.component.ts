import { Component, OnInit } from '@angular/core';

export class User{
    name:string;
    username:string;
}

@Component({
    selector: 'template-form',
    templateUrl: './app/template/template-form.component.html',
    styleUrls:['./app/template/template-form.component.css']
})

export class TemplateFormComponent implements OnInit {
    user:User;
    submitted:boolean=false;//check if the form is submitited
    constructor() { } 

    ngOnInit() {
        this.user={
            name:'Chris',
            username:'asd',
        }
    }

    get diagnostic(){
        return JSON.stringify(this.user);
    }

    processForm(){
        console.log(this.user);
        this.submitted=true;

        //create a user
        //this.service.createUser
    }
}