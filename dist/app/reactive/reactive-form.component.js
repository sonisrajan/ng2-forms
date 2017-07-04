"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ReactiveFormComponent = (function () {
    function ReactiveFormComponent(fb) {
        this.fb = fb;
        this.formErrors = {
            name: '',
            username: '',
            addresses: [
                { city: '', country: '' }
            ]
        };
        this.validationMessages = {
            name: {
                required: 'Name is required',
                minlength: 'Name must be 3 characters',
                maxlength: 'Name can\'t be longer than 6 characters'
            },
            username: {
                required: 'Username is required',
                minlength: 'Userame must be 3 characters',
            },
            addresses: {
                city: {
                    required: 'City is required',
                    minlength: 'City must be 3 characters'
                },
                country: {
                    required: 'Country is required',
                    minlength: 'Country must be 3 characters'
                }
            }
        };
    }
    ReactiveFormComponent.prototype.ngOnInit = function () {
        //buid that data model for our form
        this.buildForm();
    };
    ReactiveFormComponent.prototype.buildForm = function () {
        // this.form=new FormGroup({
        //     name:new FormControl(''),
        //     username:new FormControl('')
        // });
        var _this = this;
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.minLength(3), forms_1.Validators.maxLength(6)]],
            username: ['', forms_1.Validators.minLength(3)],
            addresses: this.fb.array([
                this.createAddress()
            ])
        });
        //watch for changes and validate
        this.form.valueChanges.subscribe(function (data) {
            _this.validateForm();
        });
        console.log(this.form);
    };
    ReactiveFormComponent.prototype.validateForm = function () {
        //loop over the formErrors field names
        for (var field in this.formErrors) {
            //clear that input field errors
            this.formErrors[field] = '';
            //grab an input field by name
            var input = this.form.get(field);
            if (input.invalid && input.dirty) {
                //figure out that type of error
                for (var error in input.errors) {
                    this.formErrors[field] = this.validationMessages[field][error];
                }
                //assign that type of error message to a variable
            }
        }
        this.validateAddresses();
    };
    ReactiveFormComponent.prototype.validateAddresses = function () {
        //grab the adddeses form array
        var addresses = this.form.get("addresses");
        //clear for merrors
        this.formErrors.addresses = [];
        //loop through formgroups in formarray
        var n = 1;
        while (n <= addresses.length) {
            //add cthe clear errors back
            this.formErrors.addresses.push({ city: '', country: '' });
            //grab the specific group(address)
            var address = addresses.at(n - 1);
            //validate that specific group
            for (var field in address.controls) {
                var input = address.get(field);
                //do the validation and  save errors to form errors in necessary
                if (input.invalid && input.dirty) {
                    for (var error in input.errors) {
                        this.formErrors.addresses[n - 1][field] = this.validationMessages.addresses[field][error];
                    }
                }
            }
            n++;
        }
    };
    ReactiveFormComponent.prototype.createAddress = function () {
        return this.fb.group({
            city: ['', [forms_1.Validators.minLength(3)]],
            country: ['']
        });
    };
    ReactiveFormComponent.prototype.addAddress = function () {
        var address = this.form.get('addresses');
        address.push(this.createAddress());
    };
    ReactiveFormComponent.prototype.removeAddress = function (i) {
        var address = this.form.get("addresses");
        address.removeAt(i);
    };
    ReactiveFormComponent.prototype.processForm = function () {
        console.log("processing", this.form.value);
    };
    return ReactiveFormComponent;
}());
ReactiveFormComponent = __decorate([
    core_1.Component({
        selector: 'reactive-form',
        templateUrl: './app/reactive/reactive-form.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], ReactiveFormComponent);
exports.ReactiveFormComponent = ReactiveFormComponent;
//# sourceMappingURL=reactive-form.component.js.map