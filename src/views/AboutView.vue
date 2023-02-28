<template>
  <div ref="el">home</div>
</template>
<script setup lang="ts">
const props = defineProps<{
  foo: string;
  bar?: number;
}>();
const emit = defineEmits(['change', 'update']);
const el = ref<HTMLDivElement | null>(null);
const book: Book = reactive({ title: '' });
book.title = '123';
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
