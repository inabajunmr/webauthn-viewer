<template>
  <div class="container">
    <div class="login-form">
      <h1 class="title has-text-centered">Login</h1>
      <div class="subtitle has-text-centered has-text-grey">
        conditional:meditation flow demo page
      </div>
      
      <form @submit="handleSubmit">
        <div class="field">
          <label class="label">User ID</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="email"
              required
              autocomplete="username"
              placeholder="Enter any user ID"
            />
          </div>
        </div>
        
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="password"
              required
              autocomplete="current-password"
              placeholder="Password"
            />
          </div>
        </div>
        
        <div class="field">
          <div class="control">
            <button 
              type="submit" 
              class="button is-primary is-fullwidth is-medium"
              :class="{ 'is-loading': isLoading }"
              :disabled="isLoading"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      
      <div class="notification is-info is-light">
        <p class="is-size-7">
          After login, passkey will be automatically created with configured parameters
        </p>
      </div>
      
      <div class="has-text-centered">
        <a @click="goBack" class="is-size-7">
          ← Back to WebAuthn Viewer
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      
      if (!this.email || !this.password) {
        this.$buefy.toast.open({
          message: 'Please enter both User ID and password',
          type: 'is-warning'
        });
        return;
      }
      
      this.isLoading = true;
      
      // Prepare parameters (add login completed flag)
      const params = {
        ...this.$route.query,
        email: this.email,
        loginCompleted: 'true'
      };
      
      // Return to Create tab
      setTimeout(() => {
        this.$router.push({
          path: '/',
          query: params
        });
      }, 500);
    },
    
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
}

.login-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.title {
  margin-bottom: 10px;
}

.subtitle {
  margin-bottom: 30px;
  font-size: 0.9rem;
}

.field {
  margin-bottom: 20px;
}

.notification {
  margin-top: 20px;
  margin-bottom: 20px;
}

a {
  cursor: pointer;
  color: #3273dc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>