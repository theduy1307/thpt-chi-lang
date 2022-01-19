import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.scss"],
})
export class SuccessComponent implements OnInit {
  constructor(private router: Router, public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  handleBack() {
    this.modal.close()
    this.router.navigate([`hoc-sinh/danh-sach-bai-kiem-tra-truc-tuyen`])
  }

  // handleCreate() {
  //   this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => this.router.navigate([this.create]));
  // }
}
