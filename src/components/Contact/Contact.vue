<template>
  <div class="contact-section" id="contact">
    <h2 class="contact-title">Contact</h2>
    <div class="form-container">
      <div class="form-section">
        <div class="form-row two-col">
          <div class="form-group">
            <label class="form-label" for="name">Name</label>
            <input v-model="name" class="form-input" type="text" name="name" id="name">
          </div>
          <div class="form-group">
            <label class="form-label" for="lastname">Lastname</label>
            <input v-model="lastname" class="form-input" type="text" name="lastname" id="lastname">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input v-model="email" class="form-input" type="email" name="email" id="email" @blur="validateEmail" required>
            <label for="email" class="error">{{ errorEmail }}</label>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="subject">Subject</label>
            <input v-model="subject" class="form-input" type="text" name="subject" id="subject">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="message">Message</label>
            <textarea v-model="message" class="form-input" name="message" id="message"></textarea>
          </div>
        </div>
        <button @click="send()" class="send-button">Enviar</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import emailjs from 'emailjs-com';

export default {
  name: "Contact",
  data() {
    return {
      name: '',
      lastname: '',
      email: '',
      subject: '',
      message: '',
      errorEmail: ''
    }
  },
  methods: {
    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.errorEmail = '';
      } else {
        this.errorEmail = 'Please enter a valid email address';
      }
    },
    send() {
      if (this.errorEmail === '' && this.email !== '') {
        const templateParams = {
          subject: this.subject,
          name: this.name,
          lastname: this.lastname,
          message: this.message,
          email: this.email,
        };
        emailjs.send('service_5zm0f0l', 'template_ap32zno', templateParams, '2uNIvfZsBycIM370Q')
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
          console.log('FAILED...', error);
        });
      }
    }
  },
}
</script>
<style lang="scss">
.contact-section {
  background-color: $dark-gray;
  padding: 50px 25px 100px;
  .contact-title {
    color: $green;
    font-size: 3rem;
    line-height: 3rem;
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 1rem;
  }
  .form-container {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    .form-section {
      max-width: 600px;
      width: 100%;
      .form-row {
        display: grid;
        grid-template-columns: 1fr;
        padding-bottom: 25px;
        &.two-col {
          grid-template-columns: 1fr 1fr;
          column-gap: 25px;
        }
        .form-group {
          display: grid;
          .form-label {
            color: $gray;
          }
          .error {
            color: $green;
            min-height: 20px;
          }
          .form-input {
            background: transparent;
            border-bottom: 1px solid $gray;
            border-right: none;
            border-left: none;
            border-top: none;
            padding: 20px 0 10px;
            color: $gray;
            resize: vertical;
            &:-webkit-autofill,
            &:-webkit-autofill:hover, 
            &:-webkit-autofill:focus, 
            &:-webkit-autofill:active{
                -webkit-box-shadow: 0 0 0 30px $dark-gray inset !important;
                -webkit-text-fill-color: $gray !important;
            }
            &:focus-visible {
              outline: none;
            }
          }
        }
      }
      .send-button {
        background: $green;
        border: 1px solid $green;
        color: $dark-gray;
        padding: 10px 15px;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background: $green;
          color: $dark-gray;
        }
      }
    }
  }
}
</style>