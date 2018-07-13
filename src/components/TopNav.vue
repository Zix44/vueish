<template>
    <div id="nav">
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="../assets/brand.png" alt="Place Brand here" width="28" height="28">
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <!-- navbar items -->
                    <router-link class="navbar-item" to="/">Home</router-link>
                    <router-link class="navbar-item" to="/events">Events</router-link>
                    <router-link class="navbar-item" to="/historian">Historian</router-link>
                    <router-link class="navbar-item" to="/tags">Tags</router-link>
                </div>
                <div class="navbar-end">
                    <router-link class="navbar-item" to="/about">Vue</router-link>
                    <!-- navbar items -->
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
  name: 'top-nav'
}
</script>

<style>
#nav a.router-link-exact-active {
  color: #00ccff;
}
</style>
