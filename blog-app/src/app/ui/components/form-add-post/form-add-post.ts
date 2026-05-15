import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators,AbstractControl,ValidationErrors } from '@angular/forms';
import { output,computed, input, OnChanges, SimpleChanges } from '@angular/core';
import { Post, AddPostData, UpdatePostData } from '../../../types/post';



//проверим строку (вдруг там одни пробелы)
function notEmptyString(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value || value.trim().length === 0) {
    return { required: true };  
  }
  return null;
}

interface MinLengthValidationInfo {
  requiredLength: number;
  actualLength: number;
}




@Component({
  standalone: true,
  selector: 'app-form-add-post',
  imports: [ReactiveFormsModule],
  templateUrl: './form-add-post.html',
  styleUrl: './form-add-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddPost implements OnChanges{ 
  editPost=input<Post| null>(null);

  protected isEditMode=computed(() => !!this.editPost());

  protected formTitle = computed(() =>
    this.isEditMode() ? 'Редактирование статьи' : 'Добавить статью'
  );

  protected saveButtonlabel = computed(() =>
    this.isEditMode() ? 'Сохранить' : 'Добавить'
  );

  public addPost = output<AddPostData>();
  public updatePost = output<UpdatePostData>();
  public cancel = output<void>();

  protected form = new FormGroup({
    title: new FormControl('',[notEmptyString, Validators.minLength(25)]),
    description: new FormControl('',notEmptyString)
  })

  protected hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    const isInvalid = control?.invalid && control.touched;
    return Boolean(isInvalid);
  }

  private getErrorStr(errorCode: string, errorData: unknown): string {
    switch (errorCode) {
      case 'required':
        return 'Заполните данное поле';
  
      case 'minlength': {
        const { requiredLength, actualLength } = errorData as MinLengthValidationInfo;
        return `Минимальная длина заголовка ${requiredLength} символов`;
      }

      default:
        return 'Ошибка при заполнении поля';
    }
  }

  protected getControlErrors(controlName: string): string[] {
    const control = this.form.get(controlName);
    const errors: Record<string, unknown> | null = control?.errors ?? null;
  
    if (!errors) {
      return [];
    }

    const errorTextArray: string[] = [];
  
    Object.entries(errors).forEach(([errorKey, errorValue]) => {
      errorTextArray.push(this.getErrorStr(errorKey, errorValue));
    });
    return errorTextArray;
  }

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

  // protected isEditMode(): boolean {
  //   return !!this.editPost();
  // }

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
