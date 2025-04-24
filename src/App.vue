<template>
  <router-view></router-view>
</template>
<script>

</script>
<style>
#app {
  font-family: 'Almarai', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: #EEE; */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* table images */
.table-image {
  width: 100px;
  height: 100px;
}

/* logo image */
.logo {
  width: 20px;
  height: 20px;
}

.table thead th {
  background-color: #169976;
  color: white;
}

/* .table thead th {
  background-color: #213448;
  color: white;
} */
</style>
