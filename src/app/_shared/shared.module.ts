import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './_material/material.module';
import { CovalentModule } from './_covalent/covalent.module';

// components
import { components, entyComponents } from './components';
// Directives
import { directives } from './directives';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CovalentModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CovalentModule,
    ...components,
    ...entyComponents,
    ...directives
  ],
  declarations: [...components, ...directives],
  entryComponents: [...entyComponents],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]
})
export class SharedModule {}
