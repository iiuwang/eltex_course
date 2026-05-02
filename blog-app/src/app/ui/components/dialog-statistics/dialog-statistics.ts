import { ChangeDetectionStrategy, Component,input, viewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, output } from '@angular/core';
import { Post } from '../../../types/post';

@Component({
  selector: 'app-dialog-statistics',
  imports: [],
  templateUrl: './dialog-statistics.html',
  styleUrl: './dialog-statistics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogStatistics implements AfterViewInit{
  visible = input(false);
  postCount = input(0);
  commentCount = input(0);
  closed = output<void>();

  dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  ngAfterViewInit() {
    this.updateDialog();
  }
  private updateDialog(){
    const dialogElement = this.dialog()?.nativeElement;
    if (!dialogElement){
      return;
    }
    if (this.visible()){
      dialogElement.showModal();
      dialogElement.addEventListener('click', (e) => {
        if (e.target === dialogElement) {
          dialogElement.close();
        }
      });

      dialogElement.onclose = () => {
        this.closed.emit();
      };
    } else{
      dialogElement.close();
      dialogElement.onclose = null;
    }
  }
  
}
