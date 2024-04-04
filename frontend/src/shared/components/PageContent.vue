<template>
    <div class="flex justify-center items-center mt-4">
        <div class="w-11/12 bg-gray-100 p-4 flex flex-col justify-start text-left">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PageContent',
};
</script>
