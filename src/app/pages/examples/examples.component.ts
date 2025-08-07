import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-examples',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './examples.component.html',
    styleUrl: './examples.component.scss'
})
export class ExamplesComponent {}
