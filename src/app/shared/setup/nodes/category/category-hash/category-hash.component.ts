import { Component, OnInit } from '@angular/core';
import { WordService } from '@app/datacapture/pages/admin/services/word.service';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-category-hash',
  templateUrl: './category-hash.component.html',
  styleUrls: ['./category-hash.component.css']
})
export class CategoryHashComponent extends PipelineNodeComponent {

  constructor(private wordService: WordService) {
    super();
  }

  words
  keywords = []

  ngOnInit(): void {
  }

  getWordsByCat(cat) {
    console.log(cat)
    this.wordService.getWordsByCat(cat).subscribe(
      data => {
        this.words = data
        console.log(this.words)
        this.words.forEach(word => {
          word.keywords.forEach(key => {
            this.keywords.push(key)
          });
        });
      }
    )
    console.log(this.keywords)
  }

  log(event){
    console.log(event)
    console.log(this.data)
  }

  categories$ = new BehaviorSubject([
    {value:'MED', label:'Medical'},
    {value:'PER', label:'Personal'},
    {value:'COM', label:'Commercial'},
    {value:'RGPD', label:'RGPD'},
    {value:'OTH', label:'Uncategorized'},
  ])

}
