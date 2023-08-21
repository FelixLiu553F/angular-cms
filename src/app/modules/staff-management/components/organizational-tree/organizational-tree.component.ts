import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalStructureTreeModel } from '../../models/organizational-structure-tree.model';

@Component({
  selector: 'organizational-tree',
  templateUrl: './organizational-tree.component.html',
  styleUrls: ['./organizational-tree.component.css']
})
export class OrganizationalTreeComponent implements OnInit {

  @Input() treeOfData!: OrganizationalStructureTreeModel;
  childrenTreeOfData?: OrganizationalStructureTreeModel;
  
  constructor() { }

  ngOnInit() {
    this.childrenTreeOfData = this.treeOfData?.children;
  }

}
