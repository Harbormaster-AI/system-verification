

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandDefinitionService } from '../../../services/CommandDefinition.service';
import { CommandDefinition } from '../../../models/CommandDefinition';

@Component({
    selector: 'app-index-commandDefinition',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexCommandDefinitionComponent implements OnInit {

    commandDefinitions: CommandDefinition[] = [];

    constructor(
        private router: Router,
        private service: CommandDefinitionService
) {}

    ngOnInit(): void {
        this.getCommandDefinitions();
}

    getCommandDefinitions(): void {
        this.service.getCommandDefinitions().subscribe((res) => {
        this.commandDefinitions = res;
    });
}

    deleteCommandDefinition(id: any): void {
        this.service.deleteCommandDefinition(id)
            .subscribe(() => {
                this.getCommandDefinitions();
            });
    }
}