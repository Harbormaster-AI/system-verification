

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandInvocationService } from '../../../services/CommandInvocation.service';
import { CommandInvocation } from '../../../models/CommandInvocation';

@Component({
    selector: 'app-index-commandInvocation',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexCommandInvocationComponent implements OnInit {

    commandInvocations: CommandInvocation[] = [];

    constructor(
        private router: Router,
        private service: CommandInvocationService
) {}

    ngOnInit(): void {
        this.getCommandInvocations();
}

    getCommandInvocations(): void {
        this.service.getCommandInvocations().subscribe((res) => {
        this.commandInvocations = res;
    });
}

    deleteCommandInvocation(id: any): void {
        this.service.deleteCommandInvocation(id)
            .subscribe(() => {
                this.getCommandInvocations();
            });
    }
}