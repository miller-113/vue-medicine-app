<template>
    <header class="header">
        <div><a href="#shop">Shop</a></div>
        <div>|</div>
        <div><a href="#cart">Shopping Cart</a></div>
    </header>
</template>

<script>
export default {
    name: 'HeaderSection'
}
</script>

<style>
    .header {
        display: flex;
        gap: 20px;
        padding: 20px;
        margin-bottom: 10px;
        background-color: rgb(230, 230, 230);
        border-radius: 15px;
    }
</style>