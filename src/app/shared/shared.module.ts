import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
