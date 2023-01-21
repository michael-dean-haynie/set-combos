import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OptionSetsFormComponent } from './components/option-sets-form/option-sets-form.component';
import { OptionSetFormComponent } from './components/option-set-form/option-set-form.component';
import { OptionFormComponent } from './components/option-form/option-form.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionSetsFormComponent,
    OptionSetFormComponent,
    OptionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
