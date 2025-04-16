<template>
    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmationModalLabel">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ message }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
            <button type="button" class="btn btn-danger" @click="confirmAction">موافق</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from 'bootstrap'
  
  export default {
    name: 'ConfirmationModal',
    data() {
      return {
        modal: null,
        title: 'Confirm Action',
        message: 'Are you sure you want to perform this action?',
        onConfirm: () => {}
      }
    },
    mounted() {
      this.modal = new Modal(document.getElementById('confirmationModal'))
    },
    methods: {
      show(options) {
        this.title = options.title || this.title
        this.message = options.message || this.message
        this.onConfirm = options.onConfirm || (() => {})
        this.modal.show()
      },
      confirmAction() {
        this.onConfirm()
        this.modal.hide()
      }
    }
  }
  </script>