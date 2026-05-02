import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators,AbstractControl,ValidationErrors } from '@angular/forms';
import { output, input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../../../types/post';


//проверим строку (вдруг там одни пробелы)
function notEmptyString(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value || value.trim().length === 0) {
    return { required: true };  
  }
  return null;
}




@Component({
  standalone: true,
  selector: 'app-form-add-post',
  imports: [ReactiveFormsModule],
  templateUrl: './form-add-post.html',
  styleUrl: './form-add-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddPost { 
  editPost=input<Post| null>(null);

  public addPost = output<Omit<Post,'id'| 'date' | 'image'>>();
  public updatePost = output<{ id: number; title: string; description: string }>();
  public cancel = output<void>();
  form = new FormGroup({
    title: new FormControl('',[notEmptyString, Validators.minLength(25)]),
    description: new FormControl('',notEmptyString)
  })

  ngOnChanges(changes: SimpleChanges){
    if (changes['editPost'] && this.editPost()) {
      const post = this.editPost();
      if (post) {
        this.form.patchValue({
          title: post.title,
          description: post.description
        });
      }
    }
  }
  protected isEditMode(): boolean {
    return !!this.editPost();
  }

  protected onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();

    if(this.isEditMode()){
      this.updatePost.emit({
        id: this.editPost()!.id,
        title: String(data.title),
        description: String(data.description)
      });
    } else{
      this.addPost.emit({
        title: String(data.title),
        description: String(data.description)
      });
    } 
    this.form.reset();
  }
  protected onCancel() {
    this.form.reset();      
    this.cancel.emit();     
  }

  
}
