import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/app-services/utility/utility.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      const id = res['id'];
      this.utilityService.setCurrentSearchUrlParams(id);
      console.log('SHOW ITEM');
      this.utilityService.changeListHeader = true;
    });
  }

}
