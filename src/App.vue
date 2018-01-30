<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color:#666;
  }

  a:hover {
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    border-color: #ccc;

    table-layout: fixed;
  }

  table tr td {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }
</style>
