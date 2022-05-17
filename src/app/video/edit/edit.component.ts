import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMessage = 'Please wait! Updating clip.'

  clipID = new FormControl('');
  title = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3)
    ]
  );

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  });

  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ) { }

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
        return
    }

    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  async submit() {
    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMessage = 'Please wait! Updating clip.'

    try {
      await this.clipService.updateClip(
        this.clipID.value, this.title.value
      )
    } catch(e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMessage = 'Something went wrong. Try again later'
      return
    }

    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMessage = 'Success!'
  }
}
