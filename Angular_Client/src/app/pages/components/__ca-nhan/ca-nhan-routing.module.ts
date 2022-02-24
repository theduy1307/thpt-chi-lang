import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaNhanComponent } from './ca-nhan.component';
import { ThongTinCaNhanComponent } from './thong-tin-ca-nhan/thong-tin-ca-nhan.component';

const routes: Routes = [
  {
    path: '',
    component: CaNhanComponent,
    //canActivate:[CaNhanAuthGuard],
    children: [
      // danh sách câu hỏi
      {
        path: 'thong-tin-ca-nhan/:id',
        component: ThongTinCaNhanComponent,
      },
      { path: '', redirectTo: 'cau-hoi', pathMatch: 'full' },
      { path: '**', redirectTo: 'cau-hoi', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaNhanRoutingModule {}
