import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/app-services/utility/utility.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      const url = this.router.url;
      if (url.includes('inbox')) { this.utilityService.setCurrentListChoiceUrlParams('inbox'); }
      else if (url.includes('starred')) { this.utilityService.setCurrentListChoiceUrlParams('starred'); }
      else if (url.includes('completed')) { this.utilityService.setCurrentListChoiceUrlParams('completed'); }
      else {
        const id = res['id'];
        this.utilityService.setCurrentListChoiceUrlParams(id);
      }
    });
  }

}

