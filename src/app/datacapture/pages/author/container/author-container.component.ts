import { Component } from "@angular/core";
import { AuthorService } from "../service/author.service";

@Component({
    selector: 'app-author-container',
    templateUrl: './author-container.component.html',
    styleUrls: ['./author-container.component.css']
})
export class AuthorContainer {
    pipelines:any = [];
    constructor(private service: AuthorService) {
        this.getData();
    }

    getData() {
        this.service.getAll().subscribe((pipelines) => {
            this.pipelines = pipelines;
        })
    }
}